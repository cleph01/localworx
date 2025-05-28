// app/api/zap/send/zapTypes.ts

// Type declarations

export interface ZapSendRequest {
  amount: number;
  lud16?: string;
  lnurl?: string;
  senderPubkey: string;
  targetPubkey: string;
  eventId: string;
  zapRequest: string; // signed event in JSON string format
}
