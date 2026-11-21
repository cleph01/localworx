// Stripe tells us a card payment finished. Verified with the webhook signing secret.
// (The confirm route also asks Stripe directly, so posting works even before this is set up.)
import { createAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return new Response("Not configured", { status: 400 });

  let event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), sig, secret);
  } catch {
    return new Response("Bad signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const s = event.data.object;
    const paymentId = s.metadata?.post_payment_id;
    if (paymentId && s.payment_status === "paid") {
      const admin = createAdminClient();
      const { data: pay } = await admin.from("post_payments").select("id, stripe_session_id").eq("id", paymentId).maybeSingle();
      if (pay && pay.stripe_session_id === s.id) await admin.rpc("mark_post_paid", { p_payment: pay.id });
    }
  }
  return new Response("ok");
}
