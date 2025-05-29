import { NextRequest, NextResponse } from "next/server";

import { getBalanceController } from "./getBalanceController";

export async function POST(request: NextRequest) {
  return getBalanceController(request);
}
