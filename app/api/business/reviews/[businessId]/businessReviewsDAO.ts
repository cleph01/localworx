import db from "@/db/db";

export async function listBusinessReviews(businessId?: number) {
  const query = db("business_reviews").select("*");
  if (businessId) query.where({ business_id: businessId });
  return query;
}
