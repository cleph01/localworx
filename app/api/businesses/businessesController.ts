import { NextRequest, NextResponse } from "next/server";
import {
  getBusinessesByOwnerIdService,
  getAllBusinessesService,
} from "./businessesService";

// Fetch all businesses by ownerId
export async function getBusinessesHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ownerId = searchParams.get("ownerId");

  try {
    if (ownerId) {
      const businesses = await getBusinessesByOwnerIdService(ownerId);
      return NextResponse.json(businesses);
    }

    const allBusinesses = await getAllBusinessesService();
    return NextResponse.json(allBusinesses);
  } catch (err) {
    console.error("Failed to fetch business by param", err);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}
