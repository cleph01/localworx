import { finalizeEvent, getEventHash } from "nostr-tools";
import { bytesToHex } from "@noble/hashes/utils";

export async function generateZapRequestEvent({
  senderPubkey,
  targetPubkey,
  eventId,
  amount,
}: {
  senderPubkey: string;
  targetPubkey: string;
  eventId: string;
  amount: number;
}) {
  const zapEvent = {
    kind: 9734,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["p", targetPubkey],
      ["e", eventId],
      ["amount", amount.toString()],
      ["relays", "wss://relay.damus.io"],
    ],
    content: "Zap from LocalWorx",
    pubkey: senderPubkey,
  };

  const signed =
    window.nostr && window.nostr.signEvent
      ? await window.nostr.signEvent(zapEvent)
      : finalizeEvent(zapEvent, new Uint8Array()); // dummy fallback if backend signs

  return signed;
}
