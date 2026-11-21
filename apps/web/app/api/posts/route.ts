// Publish a community post. The device signed the Nostr note; we check the signature,
// the posting fee (sats or card) or the free daily cap, then store it for the feed.
import { z } from "zod";
import { checkPostEvent, FREE_POSTS_PER_DAY, postDraft } from "@localworx/shared";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRequestUser, json } from "@/lib/auth";
import { fees, postFeeMethods } from "@/lib/fees";
import { invoiceFromLightningAddress } from "@/lib/lightning/lnurl";
import { stripe } from "@/lib/stripe";
import { publicEnv } from "@/lib/env";

const body = z.object({ draft: postDraft, event: z.unknown(), pay: z.enum(["sats", "usd"]).optional() });
const MAX_UNPAID_PER_DAY = 10; // stops invoice spam from one account

export async function POST(req: Request) {
  const me = await getRequestUser(req);
  if (!me) return json({ error: "Sign in to post" }, 401);
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: parsed.error.issues[0]?.message ?? "Malformed post" }, 400);
  const { draft, event, pay } = parsed.data;

  const admin = createAdminClient();
  const { data: profile } = await admin.from("profiles").select("pubkey").eq("id", me.userId).single();
  if (!profile) return json({ error: "Profile not found" }, 404);
  const check = checkPostEvent(event, draft, profile.pubkey);
  if (!check.ok) return json({ error: `Couldn't verify your post: ${check.reason}.` }, 400);

  const { data: dupe } = await admin.from("posts").select("id").eq("nostr_event_id", check.event.id).maybeSingle();
  if (dupe) return json({ error: "That post was already submitted.", post_id: dupe.id }, 409);

  const dayAgo = new Date(Date.now() - 864e5).toISOString();
  const methods = postFeeMethods();
  const row = {
    author_id: me.userId, title: draft.title, body: draft.body, media_url: draft.media_url ?? null,
    category_id: draft.category_id ?? null, city: draft.city || null, state: draft.state || null,
    nostr_event_id: check.event.id, nostr_event: check.event,
  };

  // Pilot: no fee configured → free, but capped.
  if (methods.length === 0) {
    const { count } = await admin.from("posts").select("id", { count: "exact", head: true })
      .eq("author_id", me.userId).eq("status", "published").gte("created_at", dayAgo);
    if ((count ?? 0) >= FREE_POSTS_PER_DAY) {
      return json({ error: `You've posted ${FREE_POSTS_PER_DAY} times today. Come back tomorrow.` }, 429);
    }
    const { data: post, error } = await admin.from("posts")
      .insert({ ...row, status: "published", published_at: new Date().toISOString() }).select("id").single();
    if (error) return json({ error: "Couldn't save your post." }, 500);
    return json({ status: "published", post_id: post.id, event: check.event });
  }

  const method = pay ?? methods[0];
  if (!methods.includes(method)) return json({ error: "That payment method isn't available." }, 400);
  const { count: unpaid } = await admin.from("posts").select("id", { count: "exact", head: true })
    .eq("author_id", me.userId).eq("status", "awaiting_payment").gte("created_at", dayAgo);
  if ((unpaid ?? 0) >= MAX_UNPAID_PER_DAY) return json({ error: "Too many unpaid posts today. Pay for one, or try tomorrow." }, 429);

  const { data: post, error } = await admin.from("posts").insert({ ...row, status: "awaiting_payment" }).select("id").single();
  if (error) return json({ error: "Couldn't save your post." }, 500);

  try {
    if (method === "sats") {
      const inv = await invoiceFromLightningAddress(fees.lightningAddress!, fees.postSats, "LocalWorx post fee");
      const { data: pay, error: e } = await admin.from("post_payments").insert({
        post_id: post.id, payer_id: me.userId, method, amount: fees.postSats,
        invoice: inv.invoice, payment_hash: inv.paymentHash, verify_url: inv.verifyUrl,
      }).select("id").single();
      if (e) throw new Error("Couldn't start payment");
      return json({ status: "awaiting_payment", method, post_id: post.id, payment_id: pay.id, invoice: inv.invoice, amount_sats: fees.postSats, can_auto_verify: !!inv.verifyUrl });
    }
    const { data: pay, error: e } = await admin.from("post_payments")
      .insert({ post_id: post.id, payer_id: me.userId, method, amount: fees.postUsdCents }).select("id").single();
    if (e) throw new Error("Couldn't start payment");
    const site = publicEnv.siteUrl().replace(/\/$/, "");
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: fees.postUsdCents, product_data: { name: "LocalWorx community post" } } }],
      metadata: { post_payment_id: pay.id },
      client_reference_id: pay.id,
      success_url: `${site}/community/new?paid=${pay.id}`,
      cancel_url: `${site}/community/new?cancelled=${pay.id}`,
    });
    await admin.from("post_payments").update({ stripe_session_id: session.id }).eq("id", pay.id);
    return json({ status: "awaiting_payment", method, post_id: post.id, payment_id: pay.id, checkout_url: session.url });
  } catch (e) {
    await admin.from("posts").delete().eq("id", post.id); // don't leave an orphan draft
    return json({ error: (e as Error).message || "Payment setup failed" }, 502);
  }
}
