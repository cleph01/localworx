// app/api/zap/send/route.ts
// API route handler

import { NextRequest, NextResponse } from "next/server";
import { handleZapSendRequest } from "./zapController";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await handleZapSendRequest(body);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Zap Send Error:", error);
    return NextResponse.json(
      { error: error.message || "Zap failed" },
      { status: 500 }
    );
  }
}
