// Confirm a purchase. Proof = the payment preimage, which only exists once the
// invoice is paid. It comes from the buyer's wallet, or from the seller's
// wallet via its LUD-21 verify URL.
import { z } from "zod";
import { isValidPreimage } from "@localworx/shared";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRequestUser, json } from "@/lib/auth";
import { checkVerifyUrl } from "@/lib/lightning/lnurl";

const body = z.object({ preimage: z.string().regex(/^[0-9a-f]{64}$/i).optional() });

export async function POST(req: Request, ctx: RouteContext<"/api/sales/[id]/confirm">) {
  const me = await getRequestUser(req);
  if (!me) return json({ error: "Sign in first" }, 401);
  const { id } = await ctx.params;
  const parsed = body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json({ error: "Malformed proof" }, 400);

  const admin = createAdminClient();
  const { data: sale } = await admin.from("sales").select("*").eq("id", id).maybeSingle();
  if (!sale || sale.buyer_id !== me.userId) return json({ error: "Sale not found" }, 404);
  if (sale.settled_at) return json({ ok: true, status: "settled" });

  let preimage = parsed.data.preimage ?? null;
  if (!preimage && sale.verify_url) {
    const v = await checkVerifyUrl(sale.verify_url).catch(() => null);
    if (v?.settled && v.preimage) preimage = v.preimage;
  }
  if (!preimage) return json({ ok: false, status: "unpaid" }, 202);
  if (!isValidPreimage(preimage, sale.payment_hash)) return json({ error: "That payment proof doesn't match the invoice" }, 400);

  const { error } = await admin.rpc("finalize_sale", { p_sale: id, p_preimage: preimage.toLowerCase() });
  if (error) return json({ error: error.message }, 409);
  return json({ ok: true, status: "settled" });
}
