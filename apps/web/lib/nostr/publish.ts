"use client";
// Send an already-signed note to public relays. Best effort: LocalWorx keeps its own
// copy for the feed, so a relay being down never loses the post.
import { SimplePool } from "nostr-tools/pool";
import type { Event } from "nostr-tools/pure";
import { COMMUNITY_RELAYS } from "@localworx/shared";

export async function publishToRelays(event: Event, relays: string[] = COMMUNITY_RELAYS): Promise<number> {
  const pool = new SimplePool();
  try {
    const results = await Promise.allSettled(
      pool.publish(relays, event).map((p) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 6000))])),
    );
    return results.filter((r) => r.status === "fulfilled").length;
  } finally {
    pool.close(relays);
  }
}
