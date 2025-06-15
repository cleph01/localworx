import { NextRequest } from "next/server";
import { createSubwalletHandler } from "./walletController";

export async function POST(req: NextRequest) {
  return createSubwalletHandler(req);
}
