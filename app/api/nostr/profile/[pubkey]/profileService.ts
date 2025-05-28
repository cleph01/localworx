// /app/api/nostr/profile/[pubkey]/profileService.ts
import { SimplePool } from "nostr-tools";
import { DEFAULT_RELAYS } from "../../../lib/nostr/relayList";
import { ProfileMetadata } from "./profileTypes";

export async function getProfileMetadata(
  pubkey: string
): Promise<ProfileMetadata> {
  const pool = new SimplePool();

  const [event] = await pool.querySync(DEFAULT_RELAYS, {
    kinds: [0],
    authors: [pubkey],
  });

  pool.close(DEFAULT_RELAYS);

  if (!event || !event.content) {
    return { pubkey };
  }

  try {
    const parsed = JSON.parse(event.content);
    return {
      pubkey,
      name: parsed.name,
      picture: parsed.picture,
      about: parsed.about,
      displayName: parsed.display_name,
    };
  } catch (err) {
    return { pubkey };
  }
}
