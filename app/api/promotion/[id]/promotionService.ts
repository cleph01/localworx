// api/business/create/businessService.ts

import { getPromotionById } from "./promotionDAO";

export async function fetchPromotion(id: number) {
  return getPromotionById(id);
}
