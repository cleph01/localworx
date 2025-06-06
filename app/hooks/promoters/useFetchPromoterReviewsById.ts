import { PromoterReview } from "@/types/promoter/promoterReviews";
import { useEffect, useState } from "react";

export function useFetchPromoterReviewsByPromoter(promoterId: string | number) {
  const [reviews, setReviews] = useState<PromoterReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!promoterId) return;

    const fetchReviews = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(
          `${baseUrl}/api/promoter/promoter-reviews/${promoterId}`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Failed to fetch promoter reviews");

        const reviewsData = await response.json();
        setReviews(reviewsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [promoterId]);

  return { reviews, loading, error };
}
