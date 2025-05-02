import { NextRequest, NextResponse } from "next/server";
import { handleCheckIn } from "./checkinController";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const result = await handleCheckIn(body);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: (err as Error).message || "Server error" },
      { status: 400 }
    );
  }
}
