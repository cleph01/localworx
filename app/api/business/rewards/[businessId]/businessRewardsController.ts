import { NextRequest, NextResponse } from "next/server";
import { fetchBusinessRewards } from "./businessRewardsService";

// Fetch all businesses by businessId
export async function getBusinessRewardsHandler(businessId: string) {
  try {
    const businessReviews = await fetchBusinessRewards(Number(businessId));
    return NextResponse.json(businessReviews);
  } catch (err) {
    console.error("Error in getBusinessRewardsHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch business rewards" },
      { status: 500 }
    );
  }
}
