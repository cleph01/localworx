// app/hooks/business/useFetchBusinessRewards.ts
import { useEffect, useState } from "react";

export function useFetchRewardsByBusinessId(businessId: string | number) {
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!businessId) return;

    const fetchRewards = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(
          `${baseUrl}/api/business/rewards/${businessId}`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Failed to fetch rewards");

        const rewardsData = await response.json();
        setRewards(rewardsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [businessId]);

  return { rewards, loading, error };
}
