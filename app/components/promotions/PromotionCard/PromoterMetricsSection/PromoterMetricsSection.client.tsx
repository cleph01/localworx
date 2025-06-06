"use client";

import { PromoterMetricsSectionProps } from ".";

const PromoterMetricsSection = ({
  promoterId,
}: PromoterMetricsSectionProps) => {
  /**
   * TODO: client-side fetch the click metrics/analytics
   */

  const clicks = "1336";

  const referrals = "33";

  return (
    <div className="flex flex-row items-center gap-2 text-gray-500 text-xs">
      {/* Clicks */}
      <div className="flex flex-col gap-1">
        Clicks: <span className="font-bold text-right">{clicks}</span>
      </div>

      {/* Referrals */}
      <div className="flex flex-col gap-1">
        Referrals: <span className="font-bold text-right">{referrals}</span>
      </div>
    </div>
  );
};

export default PromoterMetricsSection;
