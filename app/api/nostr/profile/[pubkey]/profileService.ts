// /app/api/nostr/profile/[pubkey]/profileService.ts
import { nip19, SimplePool } from "nostr-tools";
import { DEFAULT_RELAYS } from "../../../lib/nostr/relayList";
import { connectToRelays, publishEvent } from "../../../lib/nostr/relayManager";
import { ProfileMetadata } from "./profileTypes";

// lib/nostr/profileService.ts
import { finalizeEvent, type UnsignedEvent } from "nostr-tools/pure";
import { bytesToHex } from "@noble/hashes/utils";
import { getPublicKey } from "nostr-tools/pure";

export async function getProfileMetadata(
  pubkey: string
): Promise<ProfileMetadata> {
  const pool = new SimplePool();

  const { type, data: decodedPubkey } = nip19.decode(pubkey);

  console.log(
    "Decoded pubkey type: ",
    type,
    "Decoded pubkey data: ",
    decodedPubkey
  );

  // Ensure the pubkey is in a valid format
  let authorPubkey: string | undefined;
  // Handle different types of decoded pubkey
  if (typeof decodedPubkey === "string") {
    authorPubkey = decodedPubkey;
  } else if (decodedPubkey instanceof Uint8Array) {
    authorPubkey = bytesToHex(decodedPubkey);
  } else if (
    decodedPubkey &&
    typeof decodedPubkey === "object" &&
    "pubkey" in decodedPubkey
  ) {
    // Handle EventPointer, ProfilePointer, AddressPointer
    authorPubkey =
      typeof decodedPubkey.pubkey === "string"
        ? decodedPubkey.pubkey
        : bytesToHex(decodedPubkey.pubkey);
  } else {
    throw new Error("Invalid pubkey type from nip19.decode");
  }

  const [event] = await pool.querySync(DEFAULT_RELAYS, {
    kinds: [0],
    authors: [authorPubkey],
  });

  pool.close(DEFAULT_RELAYS);

  if (!event || !event.content) {
    return { pubkey };
  }

  try {
    console.log("Profile event raw content:", event);
    console.log("Profile event content:", event.content);

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

export async function publishKind0Profile({
  pubkey,
  privkey,
  profile,
}: {
  pubkey: string;
  privkey: string;
  profile: { name: string; about?: string; picture?: string };
}): Promise<void> {
  const content = JSON.stringify(profile);

  console.log("Publishing profile:", {
    pubkey,
    privkey: typeof privkey === "string" ? privkey : bytesToHex(privkey),
    content,
  });

  const unsignedEvent: UnsignedEvent = {
    kind: 0,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content,
    pubkey,
  };

  const privkeyBytes =
    typeof privkey === "string"
      ? new Uint8Array(Buffer.from(privkey, "hex"))
      : privkey;

  const signedEvent = finalizeEvent(unsignedEvent, privkeyBytes);

  connectToRelays(DEFAULT_RELAYS);

  try {
    const res = await publishEvent(signedEvent, { autoDisconnect: true });
    console.log("Profile published successfully");
  } catch (error) {
    console.error("Failed to publish profile:", error);
    throw new Error("Failed to publish profile");
  }

  return;
}
