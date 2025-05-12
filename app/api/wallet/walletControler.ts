// app/api/wallet/walletController.ts
import { NextRequest, NextResponse } from "next/server";
import {
  fetchRewardsById,
  addRewardToWalletService,
  redeemRewardService,
  resellRewardService,
} from "./walletService";

// Fetch all rewards in a user's wallet
export async function getWalletByUserId(userId: string) {
  try {
    const rewards = await fetchRewardsById(userId);
    return NextResponse.json(rewards);
  } catch (error) {
    return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
  }
}

// Add reward to the user's wallet
export async function addRewardToWallet(userId: string, rewardId: string) {
  try {
    const result = await addRewardToWalletService(userId, rewardId);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Redeem a reward from the wallet
export async function redeemReward(userId: string, rewardId: string) {
  try {
    const result = await redeemRewardService(userId, rewardId);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Resell reward back to the marketplace
export async function resellReward(userId: string, rewardId: string) {
  try {
    const result = await resellRewardService(userId, rewardId);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
