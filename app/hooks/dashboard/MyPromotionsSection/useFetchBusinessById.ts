"use client";

import { Business } from "@/types/business/businessType";
import { useEffect, useState } from "react";

export function useFetchBusinessById(businessId: string | number) {
  const [business, setBusiness] = useState<Business>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessId) return;

    const fetchBusiness = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(`${baseUrl}/api/business/${businessId}`, {
          cache: "no-store",
        });

        console.log("Fetching business for businessId:", businessId);
        if (!response.ok) throw new Error("Failed to fetch business");
        const data = await response.json();
        setBusiness(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [businessId]);

  return { business, loading, error };
}
