// Sign-in by signed challenge (NIP-98 style HTTP auth event).
// The device signs; the server verifies. The private key never leaves the device.
import { verifyEvent, type Event, type EventTemplate } from "nostr-tools/pure";

/** NIP-98 HTTP Auth kind. */
export const AUTH_EVENT_KIND = 27235;
/** A challenge is valid for this long after it is issued. */
export const CHALLENGE_TTL_SECONDS = 300;
/** Allowed clock skew between device and server. */
export const MAX_CLOCK_SKEW_SECONDS = 120;

export function buildAuthEventTemplate(params: {
  challenge: string;
  url: string;
  now?: number;
}): EventTemplate {
  return {
    kind: AUTH_EVENT_KIND,
    created_at: params.now ?? Math.floor(Date.now() / 1000),
    content: "Sign in to LocalWorx",
    tags: [
      ["u", params.url],
      ["method", "POST"],
      ["challenge", params.challenge],
    ],
  };
}

export type AuthCheck =
  | { ok: true; pubkey: string }
  | { ok: false; reason: string };

/**
 * Pure checks on a signed auth event. The caller must ALSO confirm that the
 * challenge was issued by us, is unexpired, and has not been used before.
 */
export function checkAuthEvent(
  event: unknown,
  expected: { challenge: string; url: string; now?: number }
): AuthCheck {
  const e = event as Event;
  if (!e || typeof e !== "object") return { ok: false, reason: "missing event" };
  if (e.kind !== AUTH_EVENT_KIND) return { ok: false, reason: "wrong kind" };
  const tag = (name: string) => e.tags?.find((t) => t[0] === name)?.[1];
  if (tag("challenge") !== expected.challenge)
    return { ok: false, reason: "challenge mismatch" };
  if (tag("u") !== expected.url) return { ok: false, reason: "url mismatch" };
  if (tag("method") !== "POST") return { ok: false, reason: "method mismatch" };
  const now = expected.now ?? Math.floor(Date.now() / 1000);
  if (Math.abs(now - e.created_at) > MAX_CLOCK_SKEW_SECONDS)
    return { ok: false, reason: "stale event" };
  let valid = false;
  try {
    // Rebuild a plain object: nostr-tools caches a "verified" flag on the event
    // object itself, and a copied object would inherit it without re-checking.
    const clean: Event = {
      id: e.id,
      pubkey: e.pubkey,
      created_at: e.created_at,
      kind: e.kind,
      tags: e.tags,
      content: e.content,
      sig: e.sig,
    };
    valid = verifyEvent(clean);
  } catch {
    valid = false;
  }
  if (!valid) return { ok: false, reason: "bad signature" };
  return { ok: true, pubkey: e.pubkey };
}
