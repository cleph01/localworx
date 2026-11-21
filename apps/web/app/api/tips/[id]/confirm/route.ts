// Was the tip paid? Proof is the preimage (tipper's wallet) or the author's wallet's
// LUD-21 verify URL. Once proven, it's added to the post's total.
import { z } from "zod";
import { isValidPreimage } from "@localworx/shared";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRequestUser, json } from "@/lib/auth";
import { checkVerifyUrl } from "@/lib/lightning/lnurl";

const body = z.object({ preimage: z.string().regex(/^[0-9a-f]{64}$/i).optional() });

export async function POST(req: Request, ctx: RouteContext<"/api/tips/[id]/confirm">) {
  const me = await getRequestUser(req);
  if (!me) return json({ error: "Sign in first" }, 401);
  const { id } = await ctx.params;
  const parsed = body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json({ error: "Malformed proof" }, 400);

  const admin = createAdminClient();
  const { data: tip } = await admin.from("post_tips").select("*").eq("id", id).maybeSingle();
  if (!tip || tip.tipper_id !== me.userId) return json({ error: "Tip not found" }, 404);
  if (tip.settled_at) return json({ status: "settled" });

  let preimage = parsed.data.preimage ?? null;
  if (!preimage && tip.verify_url) {
    const v = await checkVerifyUrl(tip.verify_url).catch(() => null);
    if (v?.settled && v.preimage) preimage = v.preimage;
  }
  if (!preimage) return json({ status: "unpaid" }, 202);
  if (!isValidPreimage(preimage, tip.payment_hash)) return json({ error: "That payment proof doesn't match the invoice" }, 400);
  await admin.rpc("settle_post_tip", { p_tip: id, p_preimage: preimage.toLowerCase() });
  return json({ status: "settled" });
}
