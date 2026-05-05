import { NextRequest, NextResponse } from "next/server";
import { checkBalanceController } from "./checkBalanceController";

export async function POST(req: NextRequest) {
  return checkBalanceController(req);
}
