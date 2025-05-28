// /app/api/nostr/zap/totals/zapTotalsTypes.ts

export interface ZapTotalsParams {
  targetPubkey: string;
  eventId: string;
}

export interface ZapTotalsResult {
  totalSats: number;
  zapCount: number;
  zappers: string[];
}
