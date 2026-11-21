// Rotating check-in codes (TOTP-style) and distance checks.
// Shown as a QR at the counter; the code changes every CODE_STEP_SECONDS.
import { hmac } from "@noble/hashes/hmac.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { utf8ToBytes, hexToBytes } from "@noble/hashes/utils.js";

export const CODE_STEP_SECONDS = 30;
/** Accept the current code and the one before it (scan + network delay). */
export const CODE_ACCEPTED_STEPS_BACK = 1;
/** Max distance between phone and business for a valid check-in. */
export const MAX_CHECKIN_DISTANCE_M = 60;

export function codeForStep(secretHex: string, step: number): string {
  const mac = hmac(sha256, hexToBytes(secretHex), utf8ToBytes(String(step)));
  // 8 decimal digits from the first 4 bytes, like TOTP dynamic truncation (simplified)
  const n = ((mac[0] & 0x7f) << 24) | (mac[1] << 16) | (mac[2] << 8) | mac[3];
  return String(n % 100_000_000).padStart(8, "0");
}

export function currentStep(nowMs = Date.now()): number {
  return Math.floor(nowMs / 1000 / CODE_STEP_SECONDS);
}

export function currentCode(secretHex: string, nowMs = Date.now()): string {
  return codeForStep(secretHex, currentStep(nowMs));
}

/** Constant-time-ish compare across the accepted window. */
export function isValidCode(secretHex: string, code: string, nowMs = Date.now()): boolean {
  if (!/^\d{8}$/.test(code)) return false;
  const step = currentStep(nowMs);
  let ok = false;
  for (let i = 0; i <= CODE_ACCEPTED_STEPS_BACK; i++) {
    const expected = codeForStep(secretHex, step - i);
    let diff = 0;
    for (let j = 0; j < 8; j++) diff |= expected.charCodeAt(j) ^ code.charCodeAt(j);
    if (diff === 0) ok = true;
  }
  return ok;
}

/** Payload encoded in the counter QR code. */
export function checkinUrl(siteUrl: string, slug: string, code: string): string {
  return `${siteUrl.replace(/\/$/, "")}/c/${encodeURIComponent(slug)}?code=${code}`;
}

export function parseCheckinUrl(url: string): { slug: string; code: string } | null {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/^\/c\/([^/]+)$/);
    const code = u.searchParams.get("code");
    if (!m || !code) return null;
    return { slug: decodeURIComponent(m[1]), code };
  } catch {
    return null;
  }
}

export function haversineMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6_371_000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
