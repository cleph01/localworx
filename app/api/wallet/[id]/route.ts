// app/api/wallet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getWalletByUserId } from "../walletControler";

// Fetch rewards for a specific user
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  // Extract the userId from the context
  const { userId } = await params;
  return getWalletByUserId(userId);
}
