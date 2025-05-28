// app/api/wallet/[id]/invoice/route.ts
import { NextResponse } from "next/server";
import { handleFundWalletRequest } from "./fundWalletController";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return handleFundWalletRequest(req, id);
}
