import { NextRequest, NextResponse } from "next/server";
import { fetchPromotions } from "./promotionsService";

// Fetch all businesses by ownerId
export async function getPromotionsHandler(req: NextRequest) {
  try {
    const promotions = await fetchPromotions();
    return NextResponse.json(promotions);
  } catch (err) {
    console.error("Error in getPromotionsHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch Promotions" },
      { status: 500 }
    );
  }
}
