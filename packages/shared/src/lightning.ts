// Non-custodial payment proof: a Lightning preimage hashes to the invoice's payment hash.
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils.js";

export function isValidPreimage(preimageHex: string, paymentHashHex: string): boolean {
  if (!/^[0-9a-f]{64}$/i.test(preimageHex) || !/^[0-9a-f]{64}$/i.test(paymentHashHex)) {
    return false;
  }
  return bytesToHex(sha256(hexToBytes(preimageHex.toLowerCase()))) === paymentHashHex.toLowerCase();
}

/** "name@domain" -> LNURL-pay well-known URL (LUD-16). */
export function lightningAddressUrl(address: string): string | null {
  const m = address.trim().toLowerCase().match(/^([a-z0-9._+-]+)@([a-z0-9.-]+\.[a-z]{2,})$/);
  if (!m) return null;
  return `https://${m[2]}/.well-known/lnurlp/${m[1]}`;
}
