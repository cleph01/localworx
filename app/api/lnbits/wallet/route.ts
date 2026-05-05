import { NextRequest } from "next/server";
import { getWalletHandler } from "./walletController";

export async function GET(req: NextRequest) {
  return getWalletHandler(req);
}
