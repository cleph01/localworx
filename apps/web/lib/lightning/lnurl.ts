import "server-only";
import { decode } from "light-bolt11-decoder";
import { lightningAddressUrl } from "@localworx/shared";

const TIMEOUT_MS = 8000;

type Json = Record<string, unknown>;
type Section = { name: string; value?: unknown };

async function getJson(url: string): Promise<Json> {
  const u = new URL(url);
  // Only public https endpoints (basic SSRF guard).
  if (u.protocol !== "https:" || /^(localhost|127\.|10\.|192\.168\.|169\.254\.|\[)/.test(u.hostname)) {
    throw new Error("Unsupported Lightning endpoint");
  }
  const res = await fetch(u, { signal: AbortSignal.timeout(TIMEOUT_MS), redirect: "error" });
  if (!res.ok) throw new Error(`Lightning endpoint answered ${res.status}`);
  return res.json();
}

/**
 * Ask a Lightning address (LUD-16) for an invoice. Returns the invoice, its
 * payment hash and amount (decoded by us, not trusted from the endpoint) and
 * the LUD-21 verify URL when the wallet provides one.
 */
export type PayMeta = { callback: string; minSats: number; maxSats: number; commentAllowed: number; allowsNostr: boolean; nostrPubkey: string | null };

/** LUD-16 metadata for a Lightning address: limits, and whether it accepts NIP-57 zaps. */
export async function lightningAddressMeta(address: string): Promise<PayMeta> {
  const wellKnown = lightningAddressUrl(address);
  if (!wellKnown) throw new Error("Invalid Lightning address");
  const meta = await getJson(wellKnown);
  if (meta.tag !== "payRequest" || typeof meta.callback !== "string") {
    throw new Error("That Lightning address can't receive payments");
  }
  const nostrPubkey = typeof meta.nostrPubkey === "string" && /^[0-9a-f]{64}$/.test(meta.nostrPubkey) ? meta.nostrPubkey : null;
  return {
    callback: meta.callback,
    minSats: Math.ceil(Number(meta.minSendable) / 1000),
    maxSats: Math.floor(Number(meta.maxSendable) / 1000),
    commentAllowed: Number(meta.commentAllowed ?? 0),
    allowsNostr: meta.allowsNostr === true && !!nostrPubkey,
    nostrPubkey,
  };
}

export async function invoiceFromLightningAddress(address: string, sats: number, comment?: string, opts: { zapRequest?: object } = {}) {
  const wellKnown = lightningAddressUrl(address);
  if (!wellKnown) throw new Error("Invalid Lightning address");
  const meta = await getJson(wellKnown);
  if (meta.tag !== "payRequest" || typeof meta.callback !== "string") {
    throw new Error("That Lightning address can't receive payments");
  }
  if (opts.zapRequest && meta.allowsNostr !== true) throw new Error("This wallet doesn't accept zaps");
  const msat = sats * 1000;
  if (msat < Number(meta.minSendable) || msat > Number(meta.maxSendable)) {
    throw new Error("Amount is outside what this wallet accepts");
  }
  const cb = new URL(meta.callback);
  cb.searchParams.set("amount", String(msat));
  const allowed = Number(meta.commentAllowed ?? 0);
  if (opts.zapRequest) cb.searchParams.set("nostr", JSON.stringify(opts.zapRequest));
  else if (comment && allowed > 0) cb.searchParams.set("comment", comment.slice(0, allowed));
  const res = await getJson(cb.toString());
  if (typeof res.pr !== "string") throw new Error(typeof res.reason === "string" ? res.reason : "Wallet did not return an invoice");

  const decoded = decode(res.pr);
  const sections = decoded.sections as Section[];
  const hash = sections.find((s) => s.name === "payment_hash");
  const amount = sections.find((s) => s.name === "amount");
  if (!hash?.value) throw new Error("Invoice has no payment hash");
  if (Number(amount?.value) !== msat) throw new Error("Invoice amount does not match");

  return {
    invoice: res.pr,
    paymentHash: String(hash.value),
    verifyUrl: typeof res.verify === "string" ? res.verify : null,
  };
}

/** LUD-21: ask the receiving wallet whether the invoice was paid. */
export async function checkVerifyUrl(verifyUrl: string): Promise<{ settled: boolean; preimage: string | null }> {
  const r = await getJson(verifyUrl);
  return { settled: r.settled === true, preimage: typeof r.preimage === "string" ? r.preimage : null };
}
