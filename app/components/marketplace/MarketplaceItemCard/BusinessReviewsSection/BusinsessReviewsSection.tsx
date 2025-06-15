"use client";

import { useFetchReviewsByBusinessId } from "@/app/hooks/reviews/useFetchReviewsByBusinessId";
import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";

type BusinessReviewsSectionProps = {
  businessId: number | string;
};

const BusinessReviewsSection = ({
  businessId,
}: BusinessReviewsSectionProps) => {
  // SSR: Fetch the reviews from the database
  const { reviews, loading, error } = useFetchReviewsByBusinessId(businessId);

  if (loading) {
    return <div className="text-gray-500">Loading reviews...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500">Error loading reviews: {error.message}</div>
    );
  }

  if (!reviews) {
    return <div>No reviews found</div>;
  }

  const { rating, reviewCount } = calculateAverageRating(
    Array.isArray(reviews) ? reviews : [reviews]
  );

  return (
    <div className="flex flex-row flex-0 items-center gap-1">
      <span className="text-base ml-2">⭐</span>{" "}
      {/* <FaStar className="text-yellow-500" /> */}
      <span className="text-gray-500 font-bold">{rating}</span>
      <span className="text-gray-400"> ({reviewCount})</span>
    </div>
  );
};

export default BusinessReviewsSection;
