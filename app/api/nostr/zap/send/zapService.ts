// app/api/zap/send/zapService.ts

// Core logic: resolve lud16 → fetch metadata → return invoice

import { ZapSendRequest } from "./zapTypes";
import { resolveLud16toLNURL, fetchZapMetadata } from "./zapUtils";

export async function sendZap({
  amount,
  lud16,
  lnurl,
  senderPubkey,
  targetPubkey,
  eventId,
  zapRequest,
}: ZapSendRequest) {
  const lnurlEndpoint = lnurl || (await resolveLud16toLNURL(lud16!));
  const metadata = await fetchZapMetadata(lnurlEndpoint);

  if (amount < metadata.minSendable || amount > metadata.maxSendable) {
    throw new Error("Zap amount out of bounds for this recipient.");
  }

  // Append query params to callback
  const callbackUrl = new URL(metadata.callback);
  callbackUrl.searchParams.set("amount", amount.toString());
  callbackUrl.searchParams.set("nostr", zapRequest);

  const invoiceRes = await fetch(callbackUrl.toString());
  const invoiceData = await invoiceRes.json();

  if (!invoiceData.pr) throw new Error("Failed to retrieve invoice");

  return {
    invoice: invoiceData.pr,
    callback: callbackUrl.toString(),
  };
}
