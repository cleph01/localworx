// app/dashboard/rewards/page.tsx
"use client";

import { useRequireAuth } from "@/app/hooks/auth/useRequireAuth";
import { useFetchRewardsOwnedByUserId } from "@/app/hooks/rewards/useFetchRewardsOwnedByUserId";
import RewardsIssuedCard from "@/app/components/rewards-vault/RewardsIssuedCard";

export default function RewardsVaultPage() {
  const { user } = useRequireAuth();

  // const { rewards, loading, error } = useFetchRewardsOwnedByUserId(user?.id);
  // MockFetch with user ID 1 for demonstration purposes
  const { rewards, loading, error } = useFetchRewardsOwnedByUserId(1);

  if (loading) {
    return <div className="p-6">Loading rewards...</div>;
  }
  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading rewards: {error.message}
      </div>
    );
  }
  if (!rewards || rewards.length === 0) {
    return (
      <div className="p-6 text-gray-500">
        You have no rewards issued yet. Find a business and start promoting or
        checking in to earn rewards!
      </div>
    );
  }

  console.log("Rewards Isseued fetched: ", rewards);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Rewards Vault</h1>
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <RewardsIssuedCard key={reward.id} {...reward} />
        ))}
      </div>
    </main>
  );
}
