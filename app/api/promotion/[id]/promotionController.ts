// api/business/create/businessController.ts

import { NextRequest, NextResponse } from "next/server";
import { fetchPromotion } from "./promotionService";

// Fetch a single business by ID
export async function getPromotionByIdHandler(_: NextRequest, id: string) {
  try {
    const promotionId = Number(id);
    const promotion = await fetchPromotion(promotionId);
    return promotion
      ? NextResponse.json(promotion)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (err) {
    console.error("Error in getPromotionByIdHandler:", err);
    return NextResponse.json(
      { error: "Failed to fetch promotion" },
      { status: 500 }
    );
  }
}
