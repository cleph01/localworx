// app/hooks/business/useFetchBusinessCategory.ts
import { useEffect, useState } from "react";

export function useFetchBusinessCategory(categoryId: string | number) {
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(
          `${baseUrl}/api/business/category/${categoryId}`,
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Failed to fetch category");

        const data = await response.json();
        setCategory(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  return { category, loading, error };
}
