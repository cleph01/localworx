import { NextRequest, NextResponse } from "next/server";
import { fetchBusinesses } from "./businessesService";

// Fetch all businesses by ownerId
export async function getBusinessesHandler(req: NextRequest) {
  try {
    const businesses = await fetchBusinesses();
    return NextResponse.json(businesses);
  } catch (err) {
    console.error("Error in getBusinessesHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}
