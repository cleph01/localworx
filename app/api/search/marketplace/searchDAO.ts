import db from "@/db/db";

export async function queryMarketplace({ q, category, sortBy }: any) {
  const query = db("marketplace_items")
    .select(
      "marketplace_items.id",
      "marketplace_items.user_id",
      "marketplace_items.business_id",
      "marketplace_items.reward_id",
      "marketplace_items.reward_issued_id",
      "marketplace_items.status",
      "marketplace_items.price",
      "marketplace_items.notes",
      "marketplace_items.created_at",
      "marketplace_items.updated_at",
      "rewards.name as reward_name",
      "rewards.description as reward_description",
      "businesses.business_name",
      "businesses.description as business_description",
      "business_categories.name as category_name"
    )
    .leftJoin("rewards", "marketplace_items.reward_id", "rewards.id")
    .leftJoin("businesses", "marketplace_items.business_id", "businesses.id")
    .leftJoin(
      "business_categories",
      "businesses.category_id",
      "business_categories.id"
    )
    .where("marketplace_items.status", "live");

  if (q) {
    const lowerQ = `%${q}%`;
    query.where((builder) => {
      builder
        .whereILike("businesses.business_name", lowerQ)
        .orWhereILike("businesses.description", lowerQ)
        .orWhereILike("rewards.name", lowerQ)
        .orWhereILike("rewards.description", lowerQ);
    });
  }

  if (category) {
    query.andWhereILike("business_categories.name", category);
  }

  switch (sortBy) {
    case "price_low_to_high":
      query.orderBy("price", "asc");
      break;
    case "price_high_to_low":
      query.orderBy("price", "desc");
      break;
    case "newest":
      query.orderBy("created_at", "desc");
      break;
    default:
      break;
  }

  return query;
}
