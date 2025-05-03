import { NextRequest, NextResponse } from "next/server";
import { handleCheckInRequest } from "./checkinController"; // Assuming this is the correct controller function

// This file handles the check-in requests for businesses.
export async function POST(req: NextRequest): Promise<NextResponse> {
  return handleCheckInRequest(req);
}
