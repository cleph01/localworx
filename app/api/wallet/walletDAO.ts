// app/api/wallet/walletDAO.ts
import db from "@/db/db"; // Assuming knex instance is set up

// Fetch rewards in a user's wallet
export async function getRewardsInWallet(userId: string) {
  return db("wallet")
    .where({ user_id: userId })
    .join("rewards", "rewards.reward_id", "wallet.reward_id");
}

// Add reward to user's wallet
export async function addRewardToWalletDAO(userId: string, rewardId: string) {
  return db("wallet").insert({
    user_id: userId,
    reward_id: rewardId,
    acquired_date: new Date(),
  });
}

// Redeem a reward from the wallet
export async function redeemRewardDAO(userId: string, rewardId: string) {
  return db("wallet")
    .where({ user_id: userId, reward_id: rewardId })
    .update({ status: "redeemed" });
}

// Resell reward back to the marketplace
export async function resellRewardDAO(userId: string, rewardId: string) {
  return db("wallet")
    .where({ user_id: userId, reward_id: rewardId })
    .update({ status: "listed", resellable: true });
}
