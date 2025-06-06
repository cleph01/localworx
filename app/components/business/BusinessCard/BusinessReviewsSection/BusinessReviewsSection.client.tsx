"use client";

import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import { useFetchBusinessReviews } from "@/app/hooks/dashboard/MyBusinessesSection/useFetchReviewsByBusinessId";

const BusinessReviewsSection = ({ businessId }: { businessId: string }) => {
  // Client-side fetching of business reviews
  const { reviews, loading, error } = useFetchBusinessReviews(businessId);

  if (loading) {
    return <div className="text-gray-500">Loading reviews...</div>;
  }
  if (error) {
    console.error("Error fetching reviews:", error);
  }

  if (!reviews) {
    return <div>No reviews found</div>;
  }

  const { rating, reviewCount } = calculateAverageRating(reviews);

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
