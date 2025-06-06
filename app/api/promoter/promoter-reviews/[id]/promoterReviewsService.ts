import { getPromoterReviewsById } from "./promoterReviewsDAO";

export async function fetchPromoterReviewsById(id: string | number) {
  return getPromoterReviewsById(id);
}
