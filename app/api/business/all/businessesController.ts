import { NextRequest, NextResponse } from "next/server";
import { fetchBusinesses } from "./businessesService";

// Fetch all businesses by ownerId
export async function getBusinessesHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId")
      ? Number(searchParams.get("ownerId"))
      : undefined;

    const businesses = await fetchBusinesses(ownerId);
    return NextResponse.json(businesses);
  } catch (err) {
    console.error("Error in getBusinessesHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}
