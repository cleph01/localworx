// app/api/promoter/[pubkey]/list/listTypes.ts

import type { Event as NostrEvent } from "nostr-tools";

export interface PromoterEventResponse {
  events: NostrEvent[];
}
