import { NextRequest, NextResponse } from "next/server";
import {
  getWalletsByUserIdService,
  getWalletByBusinessIdService,
} from "./walletService";

export async function getWalletHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const businessId = searchParams.get("businessId");

  if (!userId && !businessId) {
    return NextResponse.json(
      { error: "Either userId or businessId must be provided" },
      { status: 400 }
    );
  }

  try {
    if (userId) {
      const wallets = await getWalletsByUserIdService(userId);
      return NextResponse.json(wallets);
    }

    const wallet = await getWalletByBusinessIdService(businessId!);
    return NextResponse.json(wallet);
  } catch (err) {
    console.error("Failed to fetch LNbits wallet:", err);
    return NextResponse.json({ error: "Failed to fetch wallet" }, { status: 500 });
  }
}
