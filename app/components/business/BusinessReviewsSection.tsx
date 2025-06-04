import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";

const BusinessReviewsSection = async ({
  businessId,
}: {
  businessId: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const response = await fetch(
    `${baseUrl}/api/business/reviews/${businessId}`,
    {
      cache: "no-store", // optional: ensure fresh data in Server Components
    }
  );

  const reviews = await response.json();

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
