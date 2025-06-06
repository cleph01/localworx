// app/api/promotions/route.ts
import { NextRequest } from "next/server";
import { getPromotionsByPromoterIdHandler } from "./promotionsController";

export async function GET(req: NextRequest) {
  return getPromotionsByPromoterIdHandler(req);
}
