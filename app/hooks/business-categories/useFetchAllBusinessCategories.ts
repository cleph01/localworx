import { useEffect, useState } from "react";
import type { BusinessCategory } from "@/types/business-category/businessCategoryType";

export function useFetchAllBusinessCategories() {
  const [businessCategories, setBusinessCategories] = useState<
    BusinessCategory[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBusinessCategories = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(`${baseUrl}/api/business-categories`, {
          cache: "no-store",
        });

        if (!response.ok)
          throw new Error("Failed to fetch business categories");

        const categoriesData = await response.json();

        setBusinessCategories(categoriesData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessCategories();
  }, []);

  return { businessCategories, loading, error };
}
