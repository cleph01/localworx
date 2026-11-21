import { test } from "node:test";
import assert from "node:assert/strict";
import { generateSecretKey, getPublicKey, finalizeEvent } from "nostr-tools/pure";
import { bytesToHex } from "@noble/hashes/utils.js";
import { sha256 } from "@noble/hashes/sha2.js";
import {
  buildAuthEventTemplate, checkAuthEvent,
  codeForStep, currentStep, isValidCode, checkinUrl, parseCheckinUrl, haversineMeters,
  isValidPreimage, lightningAddressUrl, commissionRateForNth,
} from "./index";

const url = "https://localworx.io/api/auth/verify";

test("auth: valid signed challenge passes", () => {
  const sk = generateSecretKey();
  const ev = finalizeEvent(buildAuthEventTemplate({ challenge: "abc", url }), sk);
  const r = checkAuthEvent(ev, { challenge: "abc", url });
  assert.deepEqual(r, { ok: true, pubkey: getPublicKey(sk) });
});

test("auth: wrong challenge, url, stale, tampered all fail", () => {
  const sk = generateSecretKey();
  const ev = finalizeEvent(buildAuthEventTemplate({ challenge: "abc", url }), sk);
  assert.equal(checkAuthEvent(ev, { challenge: "xyz", url }).ok, false);
  assert.equal(checkAuthEvent(ev, { challenge: "abc", url: "https://evil.example/api/auth/verify" }).ok, false);
  assert.equal(checkAuthEvent(ev, { challenge: "abc", url, now: ev.created_at + 3600 }).ok, false);
  const other = getPublicKey(generateSecretKey());
  const forged = { ...ev, pubkey: other };
  assert.equal(checkAuthEvent(forged, { challenge: "abc", url }).ok, false);
});

test("checkin codes: current and previous step accepted, older rejected", () => {
  const secret = bytesToHex(sha256(new TextEncoder().encode("s")));
  const now = 1_800_000_000_000;
  const step = currentStep(now);
  assert.ok(isValidCode(secret, codeForStep(secret, step), now));
  assert.ok(isValidCode(secret, codeForStep(secret, step - 1), now));
  assert.ok(!isValidCode(secret, codeForStep(secret, step - 2), now));
  assert.ok(!isValidCode(secret, "12ab5678", now));
  const other = bytesToHex(sha256(new TextEncoder().encode("t")));
  assert.ok(!isValidCode(other, codeForStep(secret, step), now));
});

test("checkin url round-trips", () => {
  const u = checkinUrl("https://localworx.io/", "joes-coffee", "01234567");
  assert.deepEqual(parseCheckinUrl(u), { slug: "joes-coffee", code: "01234567" });
  assert.equal(parseCheckinUrl("https://localworx.io/b/joes"), null);
});

test("haversine is about right", () => {
  const d = haversineMeters({ lat: 41.0, lng: -73.66 }, { lat: 41.0005, lng: -73.66 });
  assert.ok(d > 50 && d < 60, String(d));
});

test("preimage proof", () => {
  const pre = bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
  const hash = bytesToHex(sha256(Uint8Array.from(Buffer.from(pre, "hex"))));
  assert.ok(isValidPreimage(pre, hash));
  assert.ok(!isValidPreimage(pre, hash.replace(/^./, hash[0] === "a" ? "b" : "a")));
  assert.ok(!isValidPreimage("nothex", hash));
});

test("lightning address url", () => {
  assert.equal(lightningAddressUrl("Bob@Getalby.com"), "https://getalby.com/.well-known/lnurlp/bob");
  assert.equal(lightningAddressUrl("not an address"), null);
});

test("commission tiers", () => {
  assert.equal(commissionRateForNth(1), 0.1);
  assert.equal(commissionRateForNth(20), 0.1);
  assert.equal(commissionRateForNth(21), 0.25);
  assert.equal(commissionRateForNth(50), 0.25);
  assert.equal(commissionRateForNth(51), 0.5);
});
