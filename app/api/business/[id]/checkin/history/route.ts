import { NextRequest, NextResponse } from "next/server";
import { handleGetCheckInHistory } from "./checkinHistoryController";

// This file handles the check-in-history requests for businesses or users.
export async function GET(req: NextRequest): Promise<NextResponse> {
  return handleGetCheckInHistory(req);
}
