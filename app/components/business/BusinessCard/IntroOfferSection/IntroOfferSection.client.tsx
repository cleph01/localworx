"use client";
// This component is client-side only, so we can use hooks like useFetchMyBusinesses

import LoyaltyProgramSection from "../../LoyaltyProgramSection";
import useSWR from "swr";

// IntroOfferSection.tsx
const IntroOfferSection = ({ businessId }: { businessId: string }) => {
  // Client-side fetching of rewards

  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok) throw new Error("Rewards response was not ok");
      return res.json();
    });

  // Construct the API URL for fetching rewards
  const searchUrl = `/api/business/rewards/${businessId}`;

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return <div className="space-y-2 animate-pulse p-4 bg-gray-100 rounded-lg mx-4">
      <div className="h-5 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
    </div>;
  }
  if (error) {
    console.error("Error fetching rewards:", error);
  }

  if (!data) {
    return <div>No rewards available</div>;
  }

  console.log("Fetched rewards:", data);
  // Assuming itemData is an array of rewards with a 'type' property
  const { name: introOffer } = data.find(
    (reward: any) => reward.reward_type === "intro-offer"
  );
  const { name: loyaltyReward, threshold } = data.find(
    (reward: any) => reward.reward_type === "loyalty"
  );

  return (
    <section className="bg-yellow-50 py-6 px-4 border border-yellow-300 rounded my-2 mx-4 space-y-2">
      {/* Intro Offer */}
      {introOffer ? (
        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-2">🎁 Introductory Offer</h2>
          <p className="text-gray-700 text-base font-semibold">{introOffer}</p>
          <p className="text-gray-700 text-sm">
            On your first visit when you check-in using LocalWorx.
          </p>
        </div>
      ) : (
        <p className="text-gray-700 text-sm">Currently no Introductory Offer</p>
      )}

      {/* Loyalty Reward Section */}
      {loyaltyReward ? (
        <LoyaltyProgramSection
          loyaltyReward={loyaltyReward}
          threshold={threshold}
        />
      ) : (
        <p className="text-gray-700 text-sm">
          Currently no Rewards program available
        </p>
      )}
    </section>
  );
};
export default IntroOfferSection;
