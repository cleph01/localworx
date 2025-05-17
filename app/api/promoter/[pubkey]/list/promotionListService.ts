// app/api/promoter/[pubkey]/list/listService.ts

import { type Event as NostrEvent, type Filter } from "nostr-tools";
import {
  connectToRelays,
  subscribeToEvent,
  disconnectAll,
} from "../../../lib/nostr/relayManager";
import { DEFAULT_RELAYS } from "../../../lib/nostr/relayList";

// Service: Uses SimplePool to fetch all events from a pubkey
export async function getEventsByAuthor(pubkey: string): Promise<NostrEvent[]> {
  // Connect to known relays (via SimplePool)
  connectToRelays(DEFAULT_RELAYS);

  const filters: Filter = {
    authors: [pubkey],
    kinds: [1], // Kind 1 = text notes (can expand later)
  };

  const events: NostrEvent[] = [];

  return new Promise((resolve) => {
    subscribeToEvent(
      filters,
      (event) => {
        events.push(event);
      },
      {
        autoDisconnect: true,
        timeoutMs: 4000,
      }
    );

    // Resolve events after delay buffer (to allow final events to stream in)
    setTimeout(() => {
      resolve(events);
    }, 4500);
  });
}
