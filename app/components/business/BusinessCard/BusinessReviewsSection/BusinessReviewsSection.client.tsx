"use client";

import useSWR from "swr";

import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";

const BusinessReviewsSection = ({ businessId }: { businessId: string }) => {
  // Client-side fetching of business reviews
  // const { reviews, loading, error } = useFetchBusinessReviews(businessId);

  // Client-side fetching of rewards

  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Business Card Business Reviews response was not ok");
      return res.json();
    });

  // Construct the API URL for fetching rewards
  const searchUrl = `/api/business/reviews/${businessId}`;

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return <div className="text-gray-500">Loading reviews...</div>;
  }
  if (error) {
    console.error("Error fetching reviews:", error);
  }

  if (!data) {
    return <div>No reviews found</div>;
  }

  console.log("Fetched reviews:", data);

  const { rating, reviewCount } = calculateAverageRating(data);

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
