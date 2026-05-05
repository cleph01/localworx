import { NextRequest } from "next/server";
import { createWalletHandler } from "./walletController";

export async function POST(req: NextRequest) {
  return createWalletHandler(req);
}
