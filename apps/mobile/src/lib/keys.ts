// The user's Nostr key, kept in the phone's secure keychain (iOS Keychain / Android Keystore).
// It never leaves the phone: we only send signatures.
import * as SecureStore from "expo-secure-store";
import { generateSecretKey, getPublicKey, finalizeEvent, type EventTemplate } from "nostr-tools/pure";
import * as nip19 from "nostr-tools/nip19";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils.js";

const KEY = "localworx.nsec.hex";
const OPTS: SecureStore.SecureStoreOptions = { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY };

export async function loadKey(): Promise<Uint8Array | null> {
  const hex = await SecureStore.getItemAsync(KEY, OPTS);
  return hex ? hexToBytes(hex) : null;
}

export async function createKey(): Promise<Uint8Array> {
  const sk = generateSecretKey();
  await SecureStore.setItemAsync(KEY, bytesToHex(sk), OPTS);
  return sk;
}

export async function importKey(nsec: string): Promise<Uint8Array> {
  const d = nip19.decode(nsec.trim());
  if (d.type !== "nsec") throw new Error("That isn't an nsec key");
  await SecureStore.setItemAsync(KEY, bytesToHex(d.data), OPTS);
  return d.data;
}

export async function deleteKey() {
  await SecureStore.deleteItemAsync(KEY, OPTS);
}

export const sign = (sk: Uint8Array, t: EventTemplate) => finalizeEvent(t, sk);
export const npubOf = (sk: Uint8Array) => nip19.npubEncode(getPublicKey(sk));
export const nsecOf = (sk: Uint8Array) => nip19.nsecEncode(sk);
