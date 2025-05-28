// app/api/wallet/[id]/balance/walletBalanceController.ts
import { fetchSubwalletBalance } from "./walletBalanceService";

export async function getLightningBalance(walletId: string) {
  return await fetchSubwalletBalance(walletId);
}
