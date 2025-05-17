// lib/nostr/promotionsService.ts
import {
  finalizeEvent,
  type UnsignedEvent,
  type VerifiedEvent,
} from "nostr-tools/pure";

import { bytesToHex, hexToBytes } from "@noble/hashes/utils"; // already an installed dependency
import { nip19 } from "nostr-tools";

import { connectToRelays, publishEvent } from "../../lib/nostr/relayManager";
import { DEFAULT_RELAYS } from "../../lib/nostr/relayList";

// Builds and publishes a signed Nostr event
export async function publishPromotionService({
  content,
  pubkey,
  sk,
  tags = [],
}: {
  content: string;
  pubkey: string;
  sk: string;
  tags?: string[][];
}): Promise<number> {
  // 1. Connect to relays
  connectToRelays(DEFAULT_RELAYS);

  // 2. Build unsigned event (note: no id or sig yet)
  const unsignedEvent: UnsignedEvent = {
    kind: 1,
    pubkey,
    created_at: Math.floor(Date.now() / 1000),
    tags,
    content,
  };

  // 3. Decode pubKey and secKey
  const decodedPubKey = nip19.decode(pubkey); // returns { type: 'npub', data: hex }
  const decodedSecKey = nip19.decode(sk); // returns { type: 'npub', data: hex }

  // 4. Convert secret key currently in hex code for output or persistence to
  //  Uint8Aarray for use in cryptogrpahy
  const secretKeyBytes =
    typeof decodedSecKey.data === "string"
      ? hexToBytes(decodedSecKey.data)
      : decodedSecKey.data instanceof Uint8Array
      ? decodedSecKey.data
      : new Uint8Array(decodedSecKey.data as unknown as ArrayBufferLike); // Ensure it's Uint8Array

  // 5. Finalize (sign) the event → this gives us a VerifiedEvent
  const signed: VerifiedEvent = finalizeEvent(unsignedEvent, secretKeyBytes);

  // 6. Publish to all relays and auto-disconnect
  await publishEvent(signed, { autoDisconnect: true });

  return DEFAULT_RELAYS.length;
}
