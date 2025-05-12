// app/api/wallet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getWalletByUserId } from "../walletControler";

// Fetch rewards for a specific user
export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  return getWalletByUserId(context.params.userId);
}
