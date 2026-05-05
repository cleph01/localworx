import db from "@/db/db";

export async function queryPromotions({ q, category, sortBy }: any) {
  const query = db("promotions")
    .select(
      "promotions.id",
      "promotions.business_id",
      "promotions.promoter_id",
      "promotions.title",
      "promotions.description",
      "promotions.media_url",
      "promotions.media_type",
      "promotions.expires_at",
      "promotions.is_active",
      "promotions.terms_and_conditions",
      "promotions.created_at",
      "promotions.updated_at",
      "businesses.business_name",
      "businesses.logo_url",
      "businesses.category_id",
      "business_categories.name as category_name"
    )
    .leftJoin("businesses", "promotions.business_id", "businesses.id")
    .leftJoin(
      "business_categories",
      "businesses.category_id",
      "business_categories.id"
    )
    .where("promotions.is_active", true)
    .where("businesses.is_active", true);

  if (q) {
    const lowerQ = `%${q}%`;
    query.where((builder) => {
      builder
        .whereILike("businesses.business_name", lowerQ)
        .orWhereILike("businesses.description", lowerQ)
        .orWhereILike("promotions.title", lowerQ)
        .orWhereILike("promotions.description", lowerQ);
    });
  }

  if (category) {
    query.andWhereILike("business_categories.name", category);
  }

  switch (sortBy) {
    case "newest":
      query.orderBy("created_at", "desc");
      break;
    default:
      break;
  }

  return query;
}
