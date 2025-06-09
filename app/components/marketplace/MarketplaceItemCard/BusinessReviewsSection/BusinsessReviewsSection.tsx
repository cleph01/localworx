import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import db from "@/db/db";

type BusinessReviewsSectionProps = {
  businessId: number | string;
};

const BusinessReviewsSection = async ({
  businessId,
}: BusinessReviewsSectionProps) => {
  // SSR: Fetch the reviews from the database
  const reviews = await db("business_reviews").where("business_id", businessId);

  // If clientSideFetch is true, we can use a different fetching strategy

  if (!reviews) {
    return <div>No reviews found</div>;
  }

  const { rating, reviewCount } = calculateAverageRating(reviews);

  return (
    <div className="flex flex-row flex-0 items-center gap-1">
      <span className="text-base ml-2">⭐</span>{" "}
      {/* <FaStar className="text-yellow-500" /> */}
      <span className="text-gray-500 font-bold">{rating}</span>
      <span className="text-gray-400"> ({reviewCount})</span>
    </div>
  );
};

export default BusinessReviewsSection;
