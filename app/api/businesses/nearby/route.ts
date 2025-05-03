import { NextRequest, NextResponse } from "next/server";
import { handleNearbyRequest } from "./nearbyController";

export async function GET(req: NextRequest) {
  try {
    // Extract the search parameters from the request URL
    const { searchParams } = new URL(req.url);
    // Execute the controller function to handle the request
    const result = await handleNearbyRequest(searchParams);

    return NextResponse.json(result.body, { status: result.status });
  } catch (err) {
    console.error("Unhandled error in /api/businesses/nearby:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
