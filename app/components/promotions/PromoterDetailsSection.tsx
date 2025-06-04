import db from "@/db/db";
import Button from "../ui/Button";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";

/**
 * Top Level / Main Entry component
 */
type promoterDetailsSectionProps = {
  data: {
    promoter_id: string;
  };
};

const PromoterDetailsSection = ({ data }: promoterDetailsSectionProps) => {
  return (
    <section className="w-full max-w-4xl flex flex-col border-t border-gray-200 mt-1 mb-8 py-2 gap-2 px-4">
      <PromoterProfileSection
        data={{
          promoter_id: data.promoter_id,
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
    promoter_id: string;
  };
};

const PromoterProfileSection = async ({ data }: PromoterDetailsHeaderProps) => {
  // mock fetch promoter/user details
  // const promoter = await mockFetch(`/api/users/${data.promoter_id}`);
  // SSR: Fetch the business details from the database
  // Fetch the business details from the database
  const promoter = await db("users").where("id", data.promoter_id).first();

  if (!promoter) {
    return <div>No Promoter Found</div>;
  }

  return (
    <div className="flex flex-col mt-2 gap-2">
      <p className="text-gray-500 text-sm mt-1">Promotion By:</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center mr-1 mt-1 gap-2">
          <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
            src={promoter.avatar_url}
            alt={promoter.first_name}
          />
          <div className="flex flex-col flex-1">
            <div className="text-lg sm:text-base font-semibold">
              {promoter.first_name}
            </div>
            <PromoterRatingSection data={{ promoter_id: data.promoter_id }} />
          </div>
        </div>

        <PromoterMetricsSection data={{ promoter_id: data.promoter_id }} />
      </div>

      {/* CTA - Zap Button */}
      <Button
        details={{
          text: "⚡️ Zap It!",
          css: "w-full flex-1 mt-4 py-2 bg-orange-500 text-white text-base font-bold",
        }}
      />
    </div>
  );
};

/**
 * Promoter Rating Section
 */
type PromoterRatingProps = {
  data: {
    promoter_id: string;
  };
};
const PromoterRatingSection = async ({ data }: PromoterRatingProps) => {
  // SSR: Fetch the business details from the database
  // Fetch the business details from the database
  const reviews = await db("promoter_reviews").where(
    "promoter_id",
    data.promoter_id
  );

  if (!reviews) {
    return <div>No reviews found</div>;
  }

  const { rating, reviewCount } = calculateAverageRating(reviews);

  return (
    <div className="flex flex-row items-center gap-1">
      <span className="text-sm sm:text-base">⭐</span>
      <span className="text-sm sm:text-base text-gray-500 font-semibold">
        {rating.toString()}
      </span>
      <span className="text-xs sm:text-sm text-gray-400 flex-1">
        {" "}
        ({reviewCount} {reviewCount > 1 ? "ratings" : "rating"})
      </span>
    </div>
  );
};

/**
 * Promoter Metrics Section
 */

type PromoterMetricsProps = {
  data: {
    promoter_id: string;
  };
};
const PromoterMetricsSection = async ({ data }: PromoterMetricsProps) => {
  /**
   * TODO: Create a click metrics/analytics table
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
