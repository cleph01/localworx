"use client";

import { useEffect, useState } from "react";

interface Promotion {
  id: number;
  title: string;
  description: string;
  media_url: string;
  media_type: string;
  expires_at: string;
  // Add more fields if needed
}

export function useFetchPromotionsByBusiness(businessId: string | number) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessId) return;

    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(
          `${baseUrl}/api/promotions?businessId=${businessId}`,
          { cache: "no-store" }
        );

        if (!response.ok)
          throw new Error("Failed to fetch promotions by business");
        const data = await response.json();
        setPromotions(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [businessId]);

  return { promotions, loading, error };
}
