import { useEffect, useState } from "react";
import type { Reward } from "@/types/reward/rewardType";

export function useFetchRewardById(rewardId: string | number | undefined) {
  const [reward, setReward] = useState<Reward | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!rewardId) return;

    const fetchReward = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(`${baseUrl}/api/reward/${rewardId}`, {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Failed to fetch reward");

        const rewardData = await response.json();
        setReward(rewardData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchReward();
  }, [rewardId]);

  return { reward, loading, error };
}
