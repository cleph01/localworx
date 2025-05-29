import { nip19 } from "nostr-tools";
import { getPublicKey } from "nostr-tools/pure";
import { hexToBytes } from "@noble/hashes/utils";

export function verifyNsecService(nsec: string) {
  try {
    const decoded = nip19.decode(nsec);

    if (decoded.type !== "nsec") {
      throw new Error("Invalid Nostr private key format.");
    }

    const skBytes = hexToBytes(
      typeof decoded.data === "string"
        ? decoded.data
        : Buffer.from(decoded.data).toString("hex")
    );
    const pubkey = getPublicKey(skBytes);

    return {
      pubkey,
      privkey: decoded.data,
    };
  } catch (err) {
    console.error("Failed to decode/verify nsec:", err);
    throw new Error("Invalid nsec key");
  }
}
