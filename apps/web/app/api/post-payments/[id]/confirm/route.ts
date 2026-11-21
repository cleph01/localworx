// Has this posting fee been paid? Sats: the preimage (from the payer's wallet) or the
// receiving wallet's LUD-21 verify URL. Card: ask Stripe. Paid → the post goes live.
import { z } from "zod";
import { isValidPreimage } from "@localworx/shared";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRequestUser, json } from "@/lib/auth";
import { checkVerifyUrl } from "@/lib/lightning/lnurl";
import { stripe } from "@/lib/stripe";

const body = z.object({ preimage: z.string().regex(/^[0-9a-f]{64}$/i).optional() });

export async function POST(req: Request, ctx: RouteContext<"/api/post-payments/[id]/confirm">) {
  const me = await getRequestUser(req);
  if (!me) return json({ error: "Sign in first" }, 401);
  const { id } = await ctx.params;
  const parsed = body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json({ error: "Malformed proof" }, 400);

  const admin = createAdminClient();
  const { data: pay } = await admin.from("post_payments").select("*").eq("id", id).maybeSingle();
  if (!pay || pay.payer_id !== me.userId) return json({ error: "Payment not found" }, 404);
  const done = async () => {
    const { data: post } = await admin.from("posts").select("id, nostr_event").eq("id", pay.post_id).single();
    return json({ status: "published", post_id: post?.id, event: post?.nostr_event });
  };
  if (pay.paid_at) return done();

  let paid = false;
  if (pay.method === "sats") {
    let preimage = parsed.data.preimage ?? null;
    if (!preimage && pay.verify_url) {
      const v = await checkVerifyUrl(pay.verify_url).catch(() => null);
      if (v?.settled && v.preimage) preimage = v.preimage;
    }
    if (preimage && !isValidPreimage(preimage, pay.payment_hash)) return json({ error: "That payment proof doesn't match the invoice" }, 400);
    paid = !!preimage;
  } else if (pay.stripe_session_id) {
    const s = await stripe().checkout.sessions.retrieve(pay.stripe_session_id).catch(() => null);
    paid = s?.payment_status === "paid";
  }
  if (!paid) return json({ status: "unpaid" }, 202);

  const { error } = await admin.rpc("mark_post_paid", { p_payment: id });
  if (error) return json({ error: "Couldn't publish your post" }, 500);
  return done();
}
