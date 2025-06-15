// app/dashboard/rewards/page.tsx
"use client";

import { useRequireAuth } from "@/app/hooks/auth/useRequireAuth";

import RewardsIssuedCard from "@/app/components/rewards-vault/RewardsIssuedCard";
import useSWR from "swr";

export default function RewardsVaultPage() {
  const { user } = useRequireAuth();

  // Client-side fetching of rewards by user ID
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok) throw new Error("rewards-issued response was not ok");
      return res.json();
    });

  // const searchUrl = `/api/rewards-issued/user/${user?.id}`;
  const searchUrl = `/api/rewards-issued/user/1`; // For testing purposes, replace with user?.id when auth is set up

  const { data: rewards, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
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
        {rewards &&
          rewards.map((reward: any) => (
            <RewardsIssuedCard key={reward.id} {...reward} />
          ))}
      </div>
    </main>
  );
}
