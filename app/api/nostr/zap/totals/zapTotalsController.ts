// /app/api/nostr/zap/totals/zapTotalsController.ts
import { getZapTotals } from "./zapTotalsService";
import { ZapTotalsParams } from "./zapTotalsTypes";

export async function getZapTotalsHandler(params: ZapTotalsParams) {
  return await getZapTotals(params);
}
