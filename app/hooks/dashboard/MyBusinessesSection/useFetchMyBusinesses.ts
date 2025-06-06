"use client";

import { useEffect, useState } from "react";
import { Business } from "@/types/business/businessType";

export function useFetchMyBusinesses(ownerId: string | number) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ownerId) return;

    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(
          `${baseUrl}/api/businesses?ownerId=${ownerId}`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Failed to fetch businesses");
        const data = await response.json();
        setBusinesses(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [ownerId]);

  return { businesses, loading, error };
}
