"use client";
// Everything that touches a Nostr private key lives here, in the browser only.
// The server never sees a key: it gets signed events and nothing else.
import { generateSecretKey, getPublicKey, finalizeEvent, type EventTemplate, type Event } from "nostr-tools/pure";
import * as nip19 from "nostr-tools/nip19";
import * as nip49 from "nostr-tools/nip49";
import { buildAuthEventTemplate } from "@localworx/shared";

const STORAGE_KEY = "lw_ncryptsec"; // NIP-49: key encrypted with the user's passcode

export interface Signer {
  kind: "extension" | "device";
  getPublicKey(): Promise<string>;
  signEvent(t: EventTemplate): Promise<Event>;
}

interface Nip07 {
  getPublicKey(): Promise<string>;
  signEvent(t: EventTemplate): Promise<Event>;
}

export function extensionAvailable(): boolean {
  return typeof window !== "undefined" && !!(window as unknown as { nostr?: Nip07 }).nostr;
}

export function extensionSigner(): Signer {
  const n = (window as unknown as { nostr: Nip07 }).nostr;
  return { kind: "extension", getPublicKey: () => n.getPublicKey(), signEvent: (t) => n.signEvent(t) };
}

// Unlocked device key, kept in memory only for this tab.
let unlocked: Uint8Array | null = null;

function deviceSigner(sk: Uint8Array): Signer {
  return {
    kind: "device",
    getPublicKey: async () => getPublicKey(sk),
    signEvent: async (t) => finalizeEvent(t, sk),
  };
}

export function hasDeviceKey(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem(STORAGE_KEY);
}

/** Make a brand-new key on this device. Returns the nsec so the user can back it up. */
export function createDeviceKey(passcode: string): { signer: Signer; nsec: string; npub: string } {
  const sk = generateSecretKey();
  localStorage.setItem(STORAGE_KEY, nip49.encrypt(sk, passcode));
  unlocked = sk;
  return { signer: deviceSigner(sk), nsec: nip19.nsecEncode(sk), npub: nip19.npubEncode(getPublicKey(sk)) };
}

/** Bring an existing key (nsec or ncryptsec) onto this device, encrypted with a passcode. */
export function importDeviceKey(secret: string, passcode: string): Signer {
  const s = secret.trim();
  let sk: Uint8Array;
  if (s.startsWith("ncryptsec")) sk = nip49.decrypt(s, passcode);
  else {
    const d = nip19.decode(s);
    if (d.type !== "nsec") throw new Error("That isn't an nsec key");
    sk = d.data;
  }
  localStorage.setItem(STORAGE_KEY, nip49.encrypt(sk, passcode));
  unlocked = sk;
  return deviceSigner(sk);
}

export function unlockDeviceKey(passcode: string): Signer {
  if (unlocked) return deviceSigner(unlocked);
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) throw new Error("No key on this device");
  try {
    unlocked = nip49.decrypt(stored, passcode);
  } catch {
    throw new Error("Wrong passcode");
  }
  return deviceSigner(unlocked);
}

/** Lock the key (sign-out). The encrypted copy stays so the user can unlock again. */
export function forgetKey() {
  unlocked = null;
}

/** Remove the encrypted key from this browser entirely. */
export function removeDeviceKey() {
  unlocked = null;
  localStorage.removeItem(STORAGE_KEY);
}

/** Full sign-in: get a challenge, sign it, let the server verify it. */
export async function signInWith(signer: Signer, displayName?: string) {
  const c = await fetch("/api/auth/challenge", { method: "POST" });
  if (!c.ok) throw new Error("Couldn't reach LocalWorx. Try again.");
  const { challenge, url } = await c.json();
  const event = await signer.signEvent(buildAuthEventTemplate({ challenge, url }));
  const v = await fetch("/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, display_name: displayName || undefined, client: "web" }),
  });
  const data = await v.json();
  if (!v.ok) throw new Error(data.error ?? "Sign-in failed");
  return data as { ok: true; user_id: string; is_new: boolean };
}
