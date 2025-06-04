import { listPromotions } from "./promotionsDAO";

export async function fetchPromotions() {
  return listPromotions();
}
