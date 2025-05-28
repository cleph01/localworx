// /app/api/nostr/profile/[pubkey]/profileTypes.ts

export interface ProfileMetadata {
  pubkey: string;
  name?: string;
  displayName?: string;
  picture?: string;
  about?: string;
}
