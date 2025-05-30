import { NextRequest, NextResponse } from "next/server";
import { fetchBusinessCategories } from "./businessCategoriesService";

export async function getBusinessCategoriesHandler(_: NextRequest) {
  try {
    const categories = await fetchBusinessCategories();
    return NextResponse.json(categories);
  } catch (err) {
    console.error("Error in getBusinessCategoriesHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
