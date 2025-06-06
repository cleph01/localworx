// app/api/promotions/promotionsService.ts
import { getPromotionsByPromoterId } from "./promotionsDAO";

export async function getPromotionsByPromoterIdService(
  promoterId: string | number
) {
  return await getPromotionsByPromoterId(promoterId);
}
