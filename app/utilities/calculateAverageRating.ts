import { BusinessReview } from "@/types/business-review/businessReviewType";
import { roundToDecimal } from "./roundToDecimal";
import { PromoterReview } from "@/types/promoter/promoterReviews";

export function calculateAverageRating(
  reviews: BusinessReview[] | PromoterReview[]
): {
  rating: number;
  reviewCount: number;
} {
  if (!reviews || reviews.length === 0) {
    return { rating: 5, reviewCount: 0 }; // Default rating if no reviews
  }
  // Calculate the average rating
  let rating =
    reviews.reduce((acc: number, review: any) => acc + review.rating, 0) /
    reviews.length;

  // If there are no reviews, rating will be 5
  const reviewCount = reviews.length;

  if (isNaN(rating)) {
    rating = 5; // Default rating if no reviews
  }

  rating = roundToDecimal(rating, 2);
  return { rating, reviewCount };
}
