// app/api/zap/send/zapController.ts
// Validates request, delegates to service
import { sendZap } from "./zapService";
import { ZapSendRequest } from "./zapTypes";

export async function handleZapSendRequest(body: ZapSendRequest) {
  const {
    amount,
    lud16,
    lnurl,
    senderPubkey,
    targetPubkey,
    eventId,
    zapRequest,
  } = body;

  if (
    !amount ||
    !(lud16 || lnurl) ||
    !senderPubkey ||
    !targetPubkey ||
    !eventId ||
    !zapRequest
  ) {
    throw new Error("Missing required zap parameters");
  }

  return await sendZap({
    amount,
    lud16,
    lnurl,
    senderPubkey,
    targetPubkey,
    eventId,
    zapRequest,
  });
}
