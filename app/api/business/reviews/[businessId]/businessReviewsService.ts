import { listBusinessReviews, insertBusinessReview } from "./businessReviewsDAO";

export async function fetchBusinessReviews(businessId?: number) {
  return listBusinessReviews(businessId);
}

export async function createBusinessReview({
  businessId,
  reviewerId,
  rating,
  review,
}: {
  businessId: number;
  reviewerId: number;
  rating: number;
  review?: string;
}) {
  if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5");
  return insertBusinessReview({ businessId, reviewerId, rating, review });
}
