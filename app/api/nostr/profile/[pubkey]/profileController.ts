// /app/api/nostr/profile/[pubkey]/profileController.ts
import { getProfileMetadata } from "./profileService";

export async function getProfileController(pubkey: string) {
  return await getProfileMetadata(pubkey);
}
