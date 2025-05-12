// app/api/wallet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { addRewardToWallet } from "../walletControler";

// Add reward to a user's wallet
export async function POST(req: NextRequest) {
  const { userId, rewardId } = await req.json();
  return addRewardToWallet(userId, rewardId);
}
