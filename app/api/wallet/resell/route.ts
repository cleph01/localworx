// app/api/wallet/route.ts

import { NextRequest, NextResponse } from "next/server";
import { resellReward } from "../walletControler";

// Resell reward back to marketplace
export async function POST(req: NextRequest) {
  const { userId, rewardId } = await req.json();
  return resellReward(userId, rewardId);
}
