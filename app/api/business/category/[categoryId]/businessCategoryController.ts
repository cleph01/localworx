// api/business/create/businessController.ts

import { NextRequest, NextResponse } from "next/server";
import { fetchBusinessCategory } from "./businessCategoryService";

// Fetch a single business by ID
export async function getBusinessCategoryHandler(_: NextRequest, id: string) {
  try {
    const categoryId = Number(id);
    const category = await fetchBusinessCategory(categoryId);
    return category
      ? NextResponse.json(category)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (err) {
    console.error("Error in getBusinessCategoryHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch business category" },
      { status: 500 }
    );
  }
}
