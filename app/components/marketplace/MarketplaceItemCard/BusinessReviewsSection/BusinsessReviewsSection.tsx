"use client";

import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import useSWR from "swr";

type BusinessReviewsSectionProps = {
  businessId: number | string;
};

const BusinessReviewsSection = ({
  businessId,
}: BusinessReviewsSectionProps) => {
  // Client-side fetching of reviews
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error(
          "Marketplace card business review fetch response was not ok"
        );
      return res.json();
    });

  const searchUrl = `/api/business/reviews/${businessId}`;

  const { data: reviews, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
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
