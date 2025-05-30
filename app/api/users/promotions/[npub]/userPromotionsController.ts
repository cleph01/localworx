import { NextResponse } from "next/server";
import { fetchPromotionsByUserNpub } from "./userPromotionsService";

export async function getPromotionsByUserHandler(npub: string) {
  try {
    const promotions = await fetchPromotionsByUserNpub(npub);
    return NextResponse.json(promotions);
  } catch (err) {
    console.error("Error fetching promotions for npub:", err);
    return NextResponse.json(
      { error: "Failed to fetch promotions" },
      { status: 500 }
    );
  }
}
