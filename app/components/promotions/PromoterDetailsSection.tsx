import Button from "../ui/Button";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";

/**
 * Top Level / Main Entry component
 */
type promoterDetailsSectionProps = {
  data: {
    promoterId: string;
  };
};

const PromoterDetailsSection = ({ data }: promoterDetailsSectionProps) => {
  return (
    <section className="w-full max-w-4xl flex flex-col border-t border-gray-200 mt-1 mb-8 py-2 gap-2 px-4">
      <PromoterProfileSection
        data={{
          promoterId: data.promoterId,
        }}
      />
    </section>
  );
};

export default PromoterDetailsSection;

/**
 * Promoter Profile Section
 */

type PromoterDetailsHeaderProps = {
  data: {
    promoterId: string;
  };
};

const PromoterProfileSection = async ({ data }: PromoterDetailsHeaderProps) => {
  // mock fetch promoter/user details
  const promoter = await mockFetch(`/api/users/${data.promoterId}`);

  if (!promoter) {
    return <div>No Promoter Found</div>;
  }

  const promoterData = promoter.data;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-500 text-sm mt-1">Promotion By:</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center mr-1 mt-1 gap-2">
          <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
            src={promoterData.avatarUrl}
            alt={promoterData.firstName}
          />
          <div className="text-lg sm:text-base font-semibold mr-2">
            {promoterData.firstName}
          </div>
        </div>

        <PromoterRatingSection data={{ promoterId: data.promoterId }} />
      </div>
      <PromoterMetricsSection data={{ promoterId: data.promoterId }} />
    </div>
  );
};

/**
 * Promoter Rating Section
 */
type PromoterRatingProps = {
  data: {
    promoterId: string;
  };
};
const PromoterRatingSection = async ({ data }: PromoterRatingProps) => {
  // mock fetch rating data
  const ratings = await mockFetch(
    `/api/promoter-ratings?promoterId=${data.promoterId}`
  );

  if (!ratings) {
    return <div>No Ratings Found</div>;
  }

  const ratingsData = ratings.data;

  // Count variable
  let ratingCount = 0;
  // Sum of overall ratings
  const ratingSum = ratingsData.reduce((acc: any, currItem: any) => {
    ratingCount += 1;
    return acc + Number(currItem.overall);
  }, 0);
  // Avg rating
  const avgRating = ratingSum / ratingsData.length;

  return (
    <div className="flex flex-row items-center gap-1">
      <span className="text-base sm:text-base ml-2">⭐</span>
      <span className="text-lg sm:text-base text-gray-500 font-semibold">
        {avgRating.toString()}
      </span>
      <span className="text-sm sm:text-xs text-gray-400 ">
        {" "}
        ({ratingCount} {ratingCount > 1 ? "ratings" : "rating"})
      </span>
    </div>
  );
};

/**
 * Promoter Metrics Section
 */

type PromoterMetricsProps = {
  data: {
    promoterId: string;
  };
};
const PromoterMetricsSection = async ({ data }: PromoterMetricsProps) => {
  /**
   * TODO: Create a click metrics/analytics table
   */

  const clicks = "1336";
  const views = "396";
  const referrals = "33";

  return (
    <div className="flex flex-row items-center justify-between sm:flex-col sm:items-start text-gray-500 text-sm">
      <div className="flex flex-row items-center justify-between mt-2 gap-4 mr-4">
        {/* Clicks */}
        <div className="flex flex-col gap-1">
          Clicks: <span className="font-bold">{clicks}</span>
        </div>
        {/* Views */}
        <div className="flex flex-col gap-1">
          Views: <span className="font-bold">{views}</span>
        </div>
        {/* Referrals */}
        <div className="flex flex-col gap-1">
          Referrals: <span className="font-bold">{referrals}</span>
        </div>
      </div>

      {/* CTA - Zap Button */}
      <Button
        details={{
          text: "⚡️ Zap It!",
          css: "w-full flex-1 mt-8 py-2 bg-orange-500 text-white text-base font-bold",
        }}
      />
    </div>
  );
};
