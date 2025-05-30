import { getPromotionsByOwnerNpub } from "./userPromotionsDAO";

export async function fetchPromotionsByUserNpub(npub: string) {
  return getPromotionsByOwnerNpub(npub);
}
