import { useEffect, useState } from "react";
import type { RewardIssued } from "@/types/reward/rewardIssuedType"; // Adjust based on your schema

export function useFetchRewardsOwnedByUserId(
  userId: string | number | undefined
) {
  const [rewards, setRewards] = useState<RewardIssued[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchRewards = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(
          `${baseUrl}/api/rewards-issued/user/${userId}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch owned rewards");

        const data = await response.json();
        setRewards(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [userId]);

  return { rewards, loading, error };
}
