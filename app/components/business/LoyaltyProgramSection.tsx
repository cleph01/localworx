// LoyaltyProgramSection.tsx
import React from "react";

interface LoyaltyProgramSectionProps {
  loyaltyReward: string;
  threshold: string;
}

const LoyaltyProgramSection: React.FC<LoyaltyProgramSectionProps> = ({
  loyaltyReward,
  threshold,
}) => {
  return (
    <section className="pt-6 space-y-2">
      <h2 className="text-xl font-bold mb-2">🔁 Loyalty Program</h2>
      <p className="text-gray-700 text-base font-semibold">{loyaltyReward}</p>
      <p className="text-gray-700 text-sm">
        Check in at this business{" "}
        <span className="font-semibold">
          {threshold} {Number(threshold) > 1 ? "times" : "time"}
        </span>{" "}
        🛎️ and start earning rewards which you can redeem here or re-sell for
        Bitcoin on the marketplace!
      </p>
    </section>
  );
};
export default LoyaltyProgramSection;
