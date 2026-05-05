// app/api/search/services/searchDAO.ts
import db from "@/db/db"; // adjust to your actual db client

type SearchParams = {
  q: string;
  category: string;
  hiring: boolean;
  sortBy: string;
};

export async function queryServiceDirectory({
  q,
  category,
  hiring,
  sortBy,
}: SearchParams) {
  const query = db("businesses")
    .select(
      "businesses.id",
      "businesses.description",
      "businesses.business_name",
      "businesses.address",
      "businesses.city",
      "businesses.state",
      "businesses.phone",
      "businesses.email",
      "businesses.email_verified",
      "businesses.website",
      "businesses.logo_url",
      "businesses.is_active",
      "businesses.hiring_promoters",
      "businesses.latitude",
      "businesses.longitude",
      "businesses.owner_id",
      "businesses.category_id",
      "businesses.created_at",
      "businesses.updated_at",
      "business_categories.name as category_name"
    )
    .leftJoin(
      "business_categories",
      "business_categories.id",
      "businesses.category_id"
    );

  if (q) {
    const lowerQ = `%${q}%`;
    query.where((builder) => {
      builder
        .whereILike("businesses.business_name", lowerQ)
        .orWhereILike("businesses.description", lowerQ);
    });
  }

  if (category) {
    query.andWhereILike("business_categories.name", category);
  }

  if (hiring) {
    query.andWhere("businesses.hiring_promoters", true); // assuming boolean column
  }

  switch (sortBy) {
    case "newest":
      query.orderBy("businesses.created_at", "desc");
      break;
    case "price_low_to_high":
      query.orderBy("businesses.price", "asc");
      break;
    case "price_high_to_low":
      query.orderBy("businesses.price", "desc");
      break;
    default:
      // Leave default sorting or implement relevance later
      break;
  }

  return query;
}
