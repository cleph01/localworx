import { getWalletBalance } from "./walletBalanceService";

export async function getWalletBalanceHandler(walletId: string) {
  return await getWalletBalance(walletId);
}
