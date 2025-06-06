// app/api/promotions/promotionsController.ts
import { NextRequest, NextResponse } from "next/server";
import { getPromotionsByPromoterIdService } from "./promotionsService";

export async function getPromotionsByPromoterIdHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const promoterId = searchParams.get("promoterId");

    if (!promoterId) {
      return NextResponse.json(
        { error: "Missing promoter_id in query params" },
        { status: 400 }
      );
    }

    const promotions = await getPromotionsByPromoterIdService(promoterId);
    return NextResponse.json(promotions);
  } catch (error) {
    console.error("Error in getPromotionsByPromoterIdHandler:", error);
    return NextResponse.json(
      { error: "Failed to fetch promotions by promoter_id." },
      { status: 500 }
    );
  }
}
