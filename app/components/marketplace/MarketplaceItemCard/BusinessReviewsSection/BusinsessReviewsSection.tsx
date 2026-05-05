"use client";

import useSWR from "swr";
import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import StarRating from "@/app/components/ui/StarRating";

const fetcher = (url: string) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) throw new Error("Marketplace business reviews response was not ok");
    return res.json();
  });

const BusinessReviewsSection = ({
  businessId,
}: {
  businessId: number | string;
}) => {
  const { data: reviews, error, isLoading } = useSWR(
    `/api/business/reviews/${businessId}`,
    fetcher
  );

  if (isLoading) return <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />;
  if (error || !reviews) return null;

  const { rating, reviewCount } = calculateAverageRating(
    Array.isArray(reviews) ? reviews : [reviews]
  );

  return <StarRating rating={rating} reviewCount={reviewCount} />;
};

export default BusinessReviewsSection;
