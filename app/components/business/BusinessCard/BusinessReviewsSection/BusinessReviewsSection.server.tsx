import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import StarRating from "@/app/components/ui/StarRating";
import db from "@/db/db";

const BusinessReviewsSection = async ({
  businessId,
  showSnippet = false,
}: {
  businessId: string;
  showSnippet?: boolean;
}) => {
  const reviews = await db("business_reviews").where("business_id", businessId);
  const { rating, reviewCount } = calculateAverageRating(reviews ?? []);

  const latestReview = [...(reviews ?? [])]
    .reverse()
    .find((r: any) => r.review?.trim());

  return (
    <div className="flex flex-col gap-1">
      <StarRating rating={rating} reviewCount={reviewCount} />
      {showSnippet && latestReview && (
        <p className="text-xs text-gray-500 italic line-clamp-2">
          &ldquo;{latestReview.review}&rdquo;
        </p>
      )}
    </div>
  );
};

export default BusinessReviewsSection;
