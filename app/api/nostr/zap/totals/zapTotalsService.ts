// /app/api/nostr/zap/totals/zapTotalsService.ts
import { SimplePool, type Event } from "nostr-tools";
import { decode } from "light-bolt11-decoder";
import { ZapTotalsParams, ZapTotalsResult } from "./zapTotalsTypes";
import { DEFAULT_RELAYS } from "../../../lib/nostr/relayList";

export async function getZapTotals({
  targetPubkey,
  eventId,
}: ZapTotalsParams): Promise<ZapTotalsResult> {
  const pool = new SimplePool();

  const events: Event[] = await pool.querySync(DEFAULT_RELAYS, {
    kinds: [9735],
    "#p": [targetPubkey],
    "#e": [eventId],
  });

  let totalSats = 0;
  let zapCount = 0;
  const zappers = new Set<string>();

  for (const event of events) {
    const bolt11Tag = event.tags.find(([tag]) => tag === "bolt11");
    if (!bolt11Tag) continue;

    try {
      const decoded = decode(bolt11Tag[1]);
      const amountMsat = decoded.sections.find(
        (s) => s.name === "amount"
      )?.value;

      if (amountMsat) {
        totalSats += parseInt(amountMsat) / 1000;
        zapCount++;
      }
    } catch (err) {
      console.warn("Invalid bolt11 invoice", bolt11Tag[1]);
    }

    // filetr for recent zapper avatars (or pubkey nicknames if no picture), pulled from the p tag or event pubkey of each kind: 9735 zap receipt.

    for (const event of events) {
      const bolt11Tag = event.tags.find(([tag]) => tag === "bolt11");
      if (!bolt11Tag) continue;

      try {
        const decoded = decode(bolt11Tag[1]);
        const amountMsat = decoded.sections.find(
          (s) => s.name === "amount"
        )?.value;

        if (amountMsat) {
          totalSats += parseInt(amountMsat) / 1000;
          zapCount++;
          zappers.add(event.pubkey); // Track unique zappers
        }
      } catch (err) {
        console.warn("Invalid bolt11 invoice", bolt11Tag[1]);
      }
    }
  }

  pool.close(DEFAULT_RELAYS);

  return {
    totalSats: Math.round(totalSats),
    zapCount,
    zappers: [...zappers],
  };
}
