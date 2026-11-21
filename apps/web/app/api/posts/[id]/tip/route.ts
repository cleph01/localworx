// Tip a post's author: the invoice comes straight from the AUTHOR's wallet, so the
// sats go wallet to wallet. With a signed zap request (NIP-57) it's also a public zap.
import { z } from "zod";
import { checkZapRequest } from "@localworx/shared";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRequestUser, json } from "@/lib/auth";
import { invoiceFromLightningAddress } from "@/lib/lightning/lnurl";

const body = z.object({
  amount_sats: z.number().int().min(1).max(10_000_000),
  comment: z.string().max(280).optional(),
  zap_request: z.unknown().optional(),
});

export async function POST(req: Request, ctx: RouteContext<"/api/posts/[id]/tip">) {
  const me = await getRequestUser(req);
  if (!me) return json({ error: "Sign in to tip" }, 401);
  const { id } = await ctx.params;
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "Enter a whole number of sats" }, 400);
  const { amount_sats, comment, zap_request } = parsed.data;

  const admin = createAdminClient();
  const { data: post } = await admin.from("posts")
    .select("id, author_id, nostr_event_id, status, hidden, profiles!posts_author_id_fkey(pubkey, lightning_address)")
    .eq("id", id).maybeSingle();
  if (!post || post.status !== "published" || post.hidden) return json({ error: "Post not found" }, 404);
  if (post.author_id === me.userId) return json({ error: "You can't tip your own post." }, 400);
  const author = post.profiles as unknown as { pubkey: string; lightning_address: string | null };
  if (!author.lightning_address) return json({ error: "The author hasn't added a Lightning address yet." }, 409);

  let zap: object | undefined;
  if (zap_request) {
    const { data: tipper } = await admin.from("profiles").select("pubkey").eq("id", me.userId).single();
    const c = checkZapRequest(zap_request, {
      tipperPubkey: tipper!.pubkey, authorPubkey: author.pubkey, eventId: post.nostr_event_id ?? "", amountSats: amount_sats,
    });
    if (!c.ok) return json({ error: `Couldn't verify the zap: ${c.reason}.` }, 400);
    zap = c.event;
  }

  try {
    const inv = await invoiceFromLightningAddress(author.lightning_address, amount_sats, comment || "Tip from LocalWorx", { zapRequest: zap });
    const { data: tip, error } = await admin.from("post_tips").insert({
      post_id: id, tipper_id: me.userId, amount_sats, invoice: inv.invoice,
      payment_hash: inv.paymentHash, verify_url: inv.verifyUrl, is_zap: !!zap,
    }).select("id").single();
    if (error) return json({ error: "Couldn't start the tip" }, 500);
    return json({ tip_id: tip.id, invoice: inv.invoice, amount_sats, can_auto_verify: !!inv.verifyUrl });
  } catch (e) {
    return json({ error: (e as Error).message }, 502);
  }
}
