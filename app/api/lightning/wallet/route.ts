// /app/api/wallet/[id]/balance/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getWalletBalanceHandler } from "./walletBalanceController";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const walletId = params.id;

  if (!walletId) {
    return NextResponse.json({ error: "Missing wallet ID" }, { status: 400 });
  }

  try {
    const result = await getWalletBalanceHandler(walletId);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
