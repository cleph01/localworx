"use client";

import useSWR from "swr";
import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import StarRating from "@/app/components/ui/StarRating";

const fetcher = (url: string) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) throw new Error("Business reviews response was not ok");
    return res.json();
  });

const BusinessReviewsSection = ({
  businessId,
  showSnippet = false,
}: {
  businessId: string;
  showSnippet?: boolean;
}) => {
  const { data, error, isLoading } = useSWR(
    `/api/business/reviews/${businessId}`,
    fetcher
  );

  if (isLoading) {
    return <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />;
  }
  if (error || !data) return null;

  const { rating, reviewCount } = calculateAverageRating(data);

  // Most recent review with text
  const latestReview = [...data]
    .reverse()
    .find((r: any) => r.review?.trim());

  return (
    <div className="flex flex-col gap-1">
      <StarRating rating={rating} reviewCount={reviewCount} />
      {showSnippet && latestReview && (
        <p className="text-xs text-gray-500 italic line-clamp-2">
          &ldquo;{latestReview.review}&rdquo;
        </p>
      )}
    </div>
  );
};

export default BusinessReviewsSection;
