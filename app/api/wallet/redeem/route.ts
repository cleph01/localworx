// app/api/wallet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { redeemReward } from "../walletControler";

// Redeem a reward from the wallet
export async function POST(req: NextRequest) {
  const { userId, rewardId } = await req.json();
  return redeemReward(userId, rewardId);
}
