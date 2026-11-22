// Step 2 of sign-in: the device returns the challenge signed with its Nostr key.
// We check the signature, then open a normal Supabase session for that pubkey.
// The private key never reaches this server.
import { cookies } from "next/headers";
import { z } from "zod";
import { createClient as createPlainClient } from "@supabase/supabase-js";
import { checkAuthEvent, signedEvent } from "@localworx/shared";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { publicEnv } from "@/lib/env";
import { json } from "@/lib/auth";

const body = z.object({
  event: signedEvent,
  display_name: z.string().trim().min(1).max(50).optional(),
  client: z.enum(["web", "mobile"]).default("web"),
});

// Supabase Auth needs an email-shaped id. This domain never receives mail.
const internalEmail = (pubkey: string) => `${pubkey}@nostr.localworx.io`;

export async function POST(req: Request) {
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "Malformed sign-in request" }, 400);
  const { event, display_name, client } = parsed.data;

  const challenge = event.tags.find((t) => t[0] === "challenge")?.[1];
  if (!challenge) return json({ error: "Missing challenge" }, 400);

  // Verify the signature BEFORE burning the challenge, so junk requests can't consume real ones.
  const check = checkAuthEvent(event, { challenge, url: `${publicEnv.siteUrl()}/api/auth/verify` });
  if (!check.ok) return json({ error: `Sign-in rejected: ${check.reason}` }, 401);

  const admin = createAdminClient();
  const { data: fresh, error: rpcError } = await admin.rpc("consume_challenge", { p_challenge: challenge });
  if (rpcError || fresh !== true) return json({ error: "Challenge expired or already used" }, 401);

  const pubkey = check.pubkey;
  const email = internalEmail(pubkey);

  // First sign-in creates the auth user. "Already registered" is fine.
  const created = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { pubkey },
  });
  if (created.error && !/already/i.test(created.error.message)) {
    return json({ error: "Could not create account" }, 500);
  }

  const link = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (link.error || !link.data.user) return json({ error: "Could not open session" }, 500);
  const userId = link.data.user.id;

  const { data: existing } = await admin.from("profiles").select("id").eq("id", userId).maybeSingle();
  if (!existing) {
    const { error } = await admin.from("profiles").insert({
      id: userId,
      pubkey,
      display_name: display_name ?? `npub…${pubkey.slice(-6)}`,
    });
    if (error) return json({ error: "Could not create profile" }, 500);
  }

  const token_hash = link.data.properties.hashed_token;

  if (client === "mobile") {
    // The phone stores these in its secure keychain and talks to Supabase directly.
    const plain = createPlainClient(publicEnv.supabaseUrl(), publicEnv.supabaseAnonKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await plain.auth.verifyOtp({ type: "magiclink", token_hash });
    if (error || !data.session) return json({ error: "Could not open session" }, 500);
    const { access_token, refresh_token, expires_at } = data.session;
    return json({ access_token, refresh_token, expires_at, user_id: userId, is_new: !existing });
  }

  // Web: the server client writes the session into httpOnly cookies.
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type: "magiclink", token_hash });
  if (error) return json({ error: "Could not open session" }, 500);

  // Arrived through a promoter's link before signing in? Save it to the account, so the
  // promoter is credited whichever device or app this member checks in with.
  const ref = (await cookies()).get("lw_ref")?.value;
  if (ref) await admin.rpc("record_referral", { p_profile: userId, p_code: ref, p_refresh: true });
  return json({ ok: true, user_id: userId, is_new: !existing });
}
