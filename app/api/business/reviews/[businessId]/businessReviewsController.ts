import { NextRequest, NextResponse } from "next/server";
import { fetchBusinessReviews } from "./businessReviewsService";

// Fetch all businesses by businessId
export async function getBusinessReviewsHandler(businessId: string) {
  try {
    const businessReviews = await fetchBusinessReviews(Number(businessId));
    return NextResponse.json(businessReviews);
  } catch (err) {
    console.error("Error in getBusinessReviewsHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
