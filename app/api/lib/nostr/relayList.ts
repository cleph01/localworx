// relayList.ts
// You can evolve this into a database or dynamic fetch later
export const DEFAULT_RELAYS = [
  "wss://relay.localworx.io",
  "wss://relay.damus.io",
  "wss://relay.nostr.band",
];

/* 🛢️ Option B: Database (Future-Proof)
Create a relays table or JSON store with metadata (url, owner, type, active, etc.)

Use a RelayConfigService to fetch relays to use for a given action (publishing, subscribing, etc.)

For now, I’ll use Option A with DEFAULT_RELAYS imported from a relayList.ts file.
*/
