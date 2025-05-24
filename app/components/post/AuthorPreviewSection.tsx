// AuthorPreviewSection.tsx

import Button from "../ui/Button";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";

/**
 * Top Level / Main Entry component
 */
type AuthorDetailsSectionProps = {
  data: {
    userId: string;
  };
};

const AuthorPreviewSection = ({ data }: AuthorDetailsSectionProps) => {
  return (
    <section className="w-full max-w-4xl flex flex-col border-t border-gray-200 my-2 py-2 gap-2 px-4">
      <AuthorProfileSection
        data={{
          userId: data.userId,
        }}
      />
    </section>
  );
};

export default AuthorPreviewSection;

/**
 * Promoter Profile Section
 */

type AuthorDetailsHeaderProps = {
  data: {
    userId: string;
  };
};

const AuthorProfileSection = async ({ data }: AuthorDetailsHeaderProps) => {
  // mock fetch promoter/user details
  const author = await mockFetch(`/api/users/${data.userId}`);

  if (!author) {
    return <div>No author Found</div>;
  }

  const authorData = author.data;

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-gray-700">By {authorData.firstName}</p>
      <p className="text-sm text-gray-500">Community contributor</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center mr-1 mt-1 gap-2">
          <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
            src={authorData.avatarUrl}
            alt={authorData.firstName}
          />
          <div className="text-lg font-semibold mr-2">
            {authorData.firstName}
          </div>
        </div>

        <AuthorRatingSection data={{ userId: data.userId }} />
      </div>
      <AuthorMetricsSection data={{ userId: data.userId }} />
    </div>
  );
};

/**
 * Promoter Rating Section
 */
type AuthorRatingProps = {
  data: {
    userId: string;
  };
};
const AuthorRatingSection = async ({ data }: AuthorRatingProps) => {
  // mock fetch rating data
  const ratings = await mockFetch(
    `/api/promoter-ratings?promoterId=${data.userId}`
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
      <span className="text-base sm:text-2xl ml-2">⭐</span>
      <span className="text-lg sm:text-xl text-gray-500 font-semibold">
        {/* AvgRating might be NaN if no rating records exist */}
        {isNaN(avgRating) ? "5" : avgRating.toString()}
      </span>
      <span className="text-sm sm:text-base text-gray-400 ">
        {" "}
        ({ratingCount}{" "}
        {ratingCount > 1 || ratingCount === 0 ? "ratings" : "rating"})
      </span>
    </div>
  );
};

/**
 * Promoter Metrics Section
 */

type AuthorMetricsProps = {
  data: {
    userId: string;
  };
};
const AuthorMetricsSection = async ({ data }: AuthorMetricsProps) => {
  /**
   * TODO: Create a click metrics/analytics table
   */

  const clicks = "1336";
  const views = "396";
  const referrals = "33";

  return (
    <div className="flex flex-row items-center justify-between sm:flex-col sm:items-start text-gray-500 text-sm">
      <div className="flex flex-row items-center justify-between mt-2 gap-4 mr-6">
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
          css: "w-full mt-4 py-2 bg-orange-500 text-white text-base font-bold",
        }}
      />
    </div>
  );
};
