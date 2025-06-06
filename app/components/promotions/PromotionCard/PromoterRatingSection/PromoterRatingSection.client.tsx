"use client";
import { useFetchPromoterReviewsByPromoter } from "@/app/hooks/promoters/useFetchPromoterReviewsById";
// This component is client-side only, so we can use hooks like useFetchMyBusinesses

import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";

const PromoterRatingSection = ({
  promoterId,
}: {
  promoterId: number | string;
}) => {
  // SSR: Fetch the business details from the database
  // Fetch the business details from the database
  const { reviews, loading, error } =
    useFetchPromoterReviewsByPromoter(promoterId);

  if (loading) return <div className="text-gray-500">Loading...</div>;
  if (error) {
    console.error("Error loading promoter ratings:", error);
  }
  if (!reviews) {
    return <div>No reviews found</div>;
  }

  const { rating, reviewCount } = calculateAverageRating(reviews);

  return (
    <div className="flex flex-row items-center gap-1">
      <span className="text-sm sm:text-base">⭐</span>
      <span className="text-sm sm:text-base text-gray-500 font-semibold">
        {rating.toString()}
      </span>
      <span className="text-xs sm:text-sm text-gray-400 flex-1">
        {" "}
        ({reviewCount} {reviewCount > 1 ? "ratings" : "rating"})
      </span>
    </div>
  );
};

export default PromoterRatingSection;
