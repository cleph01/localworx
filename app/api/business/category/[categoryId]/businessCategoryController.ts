import { NextRequest, NextResponse } from "next/server";
import { fetchBusinessCategory } from "./businessCategoryService";

// Fetch all businesses by categoryId
export async function getBusinessCategoryHandler(categoryId: string) {
  try {
    const businessReviews = await fetchBusinessCategory(Number(categoryId));
    return NextResponse.json(businessReviews);
  } catch (err) {
    console.error("Error in getBusinessCategoryHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch business Category" },
      { status: 500 }
    );
  }
}
