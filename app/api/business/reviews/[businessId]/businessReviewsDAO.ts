import db from "@/db/db";

export async function listBusinessReviews(businessId?: number) {
  const query = db("business_reviews").select("*");
  if (businessId) query.where({ business_id: businessId });
  return query;
}

export async function insertBusinessReview({
  businessId,
  reviewerId,
  rating,
  review,
}: {
  businessId: number;
  reviewerId: number;
  rating: number;
  review?: string;
}) {
  const [inserted] = await db("business_reviews")
    .insert({ business_id: businessId, reviewer_id: reviewerId, rating, review: review ?? null })
    .returning("*");
  return inserted;
}
