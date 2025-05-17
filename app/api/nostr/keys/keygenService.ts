import { generateSecretKey, getPublicKey } from "nostr-tools/pure";
import { bytesToHex } from "@noble/hashes/utils";
import { nip19 } from "nostr-tools";
import type { NostrKeypair } from "./keygenTypes";

export function generateKeypairService(): NostrKeypair {
  // Generate private key (as Uint8Array)
  const skBytes = generateSecretKey();

  // Convert secret key to hex for display
  const skHex = bytesToHex(skBytes);

  // Derive public key (hex) from the secretKey
  const pkHex = getPublicKey(skBytes);

  return {
    pubkey: pkHex,
    privkey: skHex,
  };
}
