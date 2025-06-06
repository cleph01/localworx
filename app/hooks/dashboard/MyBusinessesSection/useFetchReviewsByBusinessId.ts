// app/hooks/business/useFetchBusinessReviews.ts
import { useEffect, useState } from "react";

export function useFetchBusinessReviews(businessId: string | number) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!businessId) return;

    const fetchReviews = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(
          `${baseUrl}/api/business/reviews/${businessId}`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Failed to fetch reviews");

        const reviewsData = await response.json();
        setReviews(reviewsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [businessId]);

  return { reviews, loading, error };
}
