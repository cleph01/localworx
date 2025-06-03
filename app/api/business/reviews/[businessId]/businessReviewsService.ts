import { listBusinessReviews } from "./businessReviewsDAO";

export async function fetchBusinessReviews(businessId?: number) {
  return listBusinessReviews(businessId);
}
