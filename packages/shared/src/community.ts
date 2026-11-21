// Community posts are ordinary Nostr notes (kind 1) signed on the author's device.
// LocalWorx stores a copy for its local feed; the same note is published to public
// relays, so it outlives LocalWorx and shows up in any Nostr app.
import { verifyEvent, type Event, type EventTemplate } from "nostr-tools/pure";
import { z } from "zod";

export const POST_EVENT_KIND = 1;
export const ZAP_REQUEST_KIND = 9734;
/** Public relays LocalWorx publishes community posts to (and asks zap receipts to go to). */
export const COMMUNITY_RELAYS = ["wss://relay.damus.io", "wss://nos.lol", "wss://relay.primal.net"];
/** While no posting fee is switched on (pilot), each member can publish this many posts per 24 h. */
export const FREE_POSTS_PER_DAY = 3;
export const TIP_PRESETS_SATS = [100, 500, 1000, 5000] as const;

export const postDraft = z.object({
  title: z.string().trim().min(3, "Give your post a title (3+ characters).").max(120),
  body: z.string().trim().max(8000).default(""),
  media_url: z.string().trim().url("Image link must be a full https:// address.").startsWith("https://", "Image link must start with https://").max(500).optional(),
  category_id: z.number().int().positive().optional(),
  city: z.string().trim().max(80).optional(),
  state: z.string().trim().max(40).optional(),
});
export type PostDraft = z.infer<typeof postDraft>;

/** The note text, built the same way on every device so the server can check it. */
export function postContent(d: Pick<PostDraft, "title" | "body" | "media_url">): string {
  return [d.title.trim(), d.body?.trim(), d.media_url?.trim()].filter(Boolean).join("\n\n");
}

const tagify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

export function buildPostEventTemplate(d: PostDraft, now = Math.floor(Date.now() / 1000)): EventTemplate {
  const tags: string[][] = [["subject", d.title.trim()], ["t", "localworx"], ["client", "LocalWorx"]];
  if (d.city && tagify(d.city)) tags.push(["t", tagify(d.city)]);
  if (d.media_url) tags.push(["imeta", `url ${d.media_url}`]);
  return { kind: POST_EVENT_KIND, created_at: now, content: postContent(d), tags };
}

/** Rebuild a plain object before verifying: nostr-tools caches a "verified" flag on the object. */
function verifiedCopy(e: Event): boolean {
  try {
    return verifyEvent({ id: e.id, pubkey: e.pubkey, created_at: e.created_at, kind: e.kind, tags: e.tags, content: e.content, sig: e.sig });
  } catch {
    return false;
  }
}

export type CheckResult = { ok: true; event: Event } | { ok: false; reason: string };

export function checkPostEvent(event: unknown, d: PostDraft, pubkey: string, now = Math.floor(Date.now() / 1000)): CheckResult {
  const e = event as Event;
  if (!e || typeof e !== "object" || e.kind !== POST_EVENT_KIND) return { ok: false, reason: "not a post" };
  if (e.pubkey !== pubkey) return { ok: false, reason: "signed by a different key than your account" };
  if (e.content !== postContent(d)) return { ok: false, reason: "post text doesn't match what was signed" };
  if (e.tags?.find((t) => t[0] === "subject")?.[1] !== d.title.trim()) return { ok: false, reason: "title doesn't match" };
  if (Math.abs(now - e.created_at) > 600) return { ok: false, reason: "signature is too old; try again" };
  if (!verifiedCopy(e)) return { ok: false, reason: "bad signature" };
  const { id, pubkey: pk, created_at, kind, tags, content, sig } = e;
  return { ok: true, event: { id, pubkey: pk, created_at, kind, tags, content, sig } };
}

/** NIP-57 zap request, signed by the tipper, handed to the author's Lightning wallet. */
export function buildZapRequestTemplate(p: { authorPubkey: string; eventId: string; amountSats: number; comment?: string; now?: number }): EventTemplate {
  return {
    kind: ZAP_REQUEST_KIND,
    created_at: p.now ?? Math.floor(Date.now() / 1000),
    content: (p.comment ?? "").slice(0, 280),
    tags: [["relays", ...COMMUNITY_RELAYS], ["amount", String(p.amountSats * 1000)], ["p", p.authorPubkey], ["e", p.eventId]],
  };
}

export function checkZapRequest(event: unknown, p: { tipperPubkey: string; authorPubkey: string; eventId: string; amountSats: number; now?: number }): CheckResult {
  const e = event as Event;
  if (!e || typeof e !== "object" || e.kind !== ZAP_REQUEST_KIND) return { ok: false, reason: "not a zap request" };
  const tag = (n: string) => e.tags?.find((t) => t[0] === n)?.[1];
  if (e.pubkey !== p.tipperPubkey) return { ok: false, reason: "zap signed by a different key" };
  if (tag("p") !== p.authorPubkey || tag("e") !== p.eventId) return { ok: false, reason: "zap points at a different post" };
  if (tag("amount") !== String(p.amountSats * 1000)) return { ok: false, reason: "zap amount mismatch" };
  const now = p.now ?? Math.floor(Date.now() / 1000);
  if (Math.abs(now - e.created_at) > 600) return { ok: false, reason: "zap request is too old" };
  if (!verifiedCopy(e)) return { ok: false, reason: "bad zap signature" };
  const { id, pubkey, created_at, kind, tags, content, sig } = e;
  return { ok: true, event: { id, pubkey, created_at, kind, tags, content, sig } };
}
