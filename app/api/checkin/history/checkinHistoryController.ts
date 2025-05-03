import { fetchCheckInHistory } from "./checkinHistoryService";
import { NextRequest, NextResponse } from "next/server";

// This file handles the check-in-history requests for businesses or users.
export async function handleGetCheckInHistory(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    const history = await fetchCheckInHistory(userId);
    return NextResponse.json(history);
  } catch (error) {
    console.error("Error fetching check-in history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
