// Can this post's author receive a tip, and does their wallet take Nostr zaps?
import { createAdminClient } from "@/lib/supabase/admin";
import { json } from "@/lib/auth";
import { lightningAddressMeta } from "@/lib/lightning/lnurl";
import { COMMUNITY_RELAYS } from "@localworx/shared";

export async function GET(_req: Request, ctx: RouteContext<"/api/posts/[id]/tip-info">) {
  const { id } = await ctx.params;
  const admin = createAdminClient();
  const { data: post } = await admin.from("posts")
    .select("id, nostr_event_id, status, hidden, profiles!posts_author_id_fkey(pubkey, lightning_address)")
    .eq("id", id).maybeSingle();
  if (!post || post.status !== "published" || post.hidden) return json({ error: "Post not found" }, 404);
  const author = post.profiles as unknown as { pubkey: string; lightning_address: string | null };
  if (!author.lightning_address) return json({ can_tip: false, reason: "The author hasn't added a Lightning address yet." });
  try {
    const m = await lightningAddressMeta(author.lightning_address);
    return json({
      can_tip: true, zap: m.allowsNostr && !!post.nostr_event_id, min_sats: Math.max(1, m.minSats), max_sats: m.maxSats,
      author_pubkey: author.pubkey, event_id: post.nostr_event_id, relays: COMMUNITY_RELAYS,
    });
  } catch {
    return json({ can_tip: false, reason: "The author's wallet isn't answering right now." });
  }
}
