import db from "@/db/db";

export async function listBusinessRewards(businessId?: number) {
  const query = db("rewards").select("*");
  if (businessId) query.where({ business_id: businessId });
  return query;
}
