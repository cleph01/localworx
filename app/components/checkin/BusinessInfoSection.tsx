// components/checkin/BusinessInfoSection.tsx

import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import Image from "next/image";

const BusinessInfoSection = async ({ businessId }: { businessId: string }) => {
  // Simulate fetching from a mock database
  const business = await mockFetch(`/api/businesses/${businessId}`);

  // Check if the business exists
  if (!business) {
    return <div>Business not found</div>;
  }

  // Extract the business data
  const businessData = business.data;

  return (
    <section className="min-w-85 sm:min-w-125 max-w-4xl bg-white border border-gray-400 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-row items-center gap-4">
        {/* Logo */}
        <img
          src={
            businessData.logoUrl ||
            "https://dn721803.ca.archive.org/0/items/placeholder-image//placeholder-image.jpg"
          }
          alt={`${businessData.businessName} logo`}
          width={64}
          height={64}
          className="rounded-full ring-2 ring-white shadow"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800">
            {businessData.businessName}
          </h2>
          <p className="text-sm text-gray-500">{businessData.category}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-2">
        <p>
          📍 <strong>Address:</strong> {businessData.address},{" "}
          {businessData.city}, {businessData.state}
        </p>
        <LoyaltyRewardsSection businessId={businessData.id} />
      </div>
    </section>
  );
};

export default BusinessInfoSection;

const LoyaltyRewardsSection = async ({
  businessId,
}: {
  businessId: string;
}) => {
  // Simulate fetching from a mock database
  const item = await mockFetch(`/api/rewards?businessId=${businessId}`);

  // Check if the item exists
  if (!item) {
    return <div>Rewards not found</div>;
  }
  // Extract the item data
  const itemData = item.data;

  // Assuming itemData is an array of rewards with a 'type' property
  const { title: loyaltyReward, threshold } = itemData.find(
    (reward: any) => reward.type === "loyalty"
  );

  return (
    <div className="space-y-2">
      <p>
        🎁 <strong>Loyalty Reward:</strong> {loyaltyReward}
      </p>
      <p>
        ⏳ <strong>Threshold:</strong> {threshold}
      </p>
    </div>
  );
};
