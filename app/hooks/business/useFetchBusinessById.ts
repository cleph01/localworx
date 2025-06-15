import { useEffect, useState } from "react";
import type { Business } from "@/types/business/businessType"; // or wherever your user type is defined

export function useFetchBusinessById(businessId: string | number) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!businessId) return;

    const fetchBusiness = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(`${baseUrl}/api/business/${businessId}`, {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const businessData = await response.json();
        setBusiness(businessData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [businessId]);

  return { business, loading, error };
}
