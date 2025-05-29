// app/api/wallets/create-subwallet/route.ts
import { NextRequest } from "next/server";
import { createSubwalletController } from "./createSubwalletController";

export async function POST(request: NextRequest) {
  return createSubwalletController(request);
}
