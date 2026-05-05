import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import StarRating from "@/app/components/ui/StarRating";
import db from "@/db/db";

const PromoterRatingSection = async ({
  promoterId,
}: {
  promoterId: number | string;
}) => {
  const reviews = await db("promoter_reviews").where("promoter_id", promoterId);
  const { rating, reviewCount } = calculateAverageRating(reviews ?? []);

  return <StarRating rating={rating} reviewCount={reviewCount} />;
};

export default PromoterRatingSection;
