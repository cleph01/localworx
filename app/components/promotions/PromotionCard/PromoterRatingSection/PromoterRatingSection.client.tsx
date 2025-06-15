"use client";

// This component is client-side only, so we can use hooks like useFetchMyBusinesses

import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import useSWR from "swr";

const PromoterRatingSection = ({
  promoterId,
}: {
  promoterId: number | string;
}) => {
  // Client-side fetching of user by promoter ID
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Promotion card promoter reviews response was not ok");
      return res.json();
    });

  const searchUrl = `/api/promoter/promoter-reviews/${promoterId}`;

  const { data, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) return <div className="text-gray-500">Loading...</div>;

  if (error) {
    console.error("Error loading promoter ratings:", error);
  }
  if (!data) {
    return <div>No reviews found</div>;
  }

  const { rating, reviewCount } = calculateAverageRating(data);

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
