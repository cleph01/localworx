// app/api/wallet/walletService.ts
import {
  getRewardsInWallet,
  addRewardToWalletDAO,
  redeemRewardDAO,
  resellRewardDAO,
} from "./walletDAO";

// Fetch rewards in a user's wallet
export async function fetchRewardsById(userId: string) {
  return await getRewardsInWallet(userId);
}

// Add reward to a user's wallet
export async function addRewardToWalletService(
  userId: string,
  rewardId: string
) {
  return await addRewardToWalletDAO(userId, rewardId);
}

// Redeem a reward from the wallet
export async function redeemRewardService(userId: string, rewardId: string) {
  return await redeemRewardDAO(userId, rewardId);
}

// Resell a reward back to the marketplace
export async function resellRewardService(userId: string, rewardId: string) {
  return await resellRewardDAO(userId, rewardId);
}
