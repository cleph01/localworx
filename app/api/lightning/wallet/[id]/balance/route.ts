// app/api/wallet/[id]/balance/route.ts
import { NextResponse } from "next/server";
import { getLightningBalance } from "./walletBalanceController";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getLightningBalance(params.id);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Balance fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }
}
