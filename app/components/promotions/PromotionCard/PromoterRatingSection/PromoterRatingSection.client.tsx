"use client";

import useSWR from "swr";
import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import StarRating from "@/app/components/ui/StarRating";

const fetcher = (url: string) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) throw new Error("Promoter reviews response was not ok");
    return res.json();
  });

const PromoterRatingSection = ({
  promoterId,
}: {
  promoterId: number | string;
}) => {
  const { data, error, isLoading } = useSWR(
    `/api/promoter/promoter-reviews/${promoterId}`,
    fetcher
  );

  if (isLoading) return <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />;
  if (error || !data) return null;

  const { rating, reviewCount } = calculateAverageRating(data);

  return <StarRating rating={rating} reviewCount={reviewCount} />;
};

export default PromoterRatingSection;
