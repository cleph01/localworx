import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import LoyaltyProgramSection from "./LoyaltyProgramSection";

// IntroOfferSection.tsx
const IntroOfferSection = async ({ businessId }: { businessId: string }) => {
  // Simulate fetching from a mock database
  const item = await mockFetch(`/api/rewards?${businessId}`);

  // Check if the item exists
  if (!item) {
    return <div>Item not found</div>;
  }
  // Extract the item data
  const itemData = item.data;

  // Assuming itemData is an array of rewards with a 'type' property
  const { title: introOffer } = itemData.find(
    (reward: any) => reward.type === "intro"
  );
  const { title: loyaltyReward, threshold } = itemData.find(
    (reward: any) => reward.type === "loyalty"
  );

  return (
    <section className="bg-yellow-50 py-6 px-6 border border-yellow-300 rounded my-6 mx-6 space-y-2">
      {/* Intro Offer */}
      {introOffer && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-2">🎁 Introductory Offer</h2>
          <p className="text-gray-700 text-base font-semibold">{introOffer}</p>
          <p className="text-gray-700 text-sm">
            On your first visit when you check-in using LocalWorx.
          </p>
        </div>
      )}

      {/* Loyalty Reward Section */}
      {loyaltyReward && (
        <LoyaltyProgramSection
          loyaltyReward={loyaltyReward}
          threshold={threshold}
        />
      )}
    </section>
  );
};
export default IntroOfferSection;
