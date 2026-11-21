// Step 1 of sign-in: hand the device a one-time challenge to sign.
import { createAdminClient } from "@/lib/supabase/admin";
import { publicEnv } from "@/lib/env";
import { json } from "@/lib/auth";

export async function POST() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const challenge = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const admin = createAdminClient();
  // Housekeeping: drop expired challenges so the table can't grow without bound.
  // (Per-IP rate limiting belongs at the edge: Vercel Firewall rule on /api/auth/*.)
  await admin.from("auth_challenges").delete().lt("expires_at", new Date().toISOString());
  const { error } = await admin.from("auth_challenges").insert({ challenge });
  if (error) return json({ error: "Could not start sign-in" }, 500);
  return json({ challenge, url: `${publicEnv.siteUrl()}/api/auth/verify` });
}
