import db from "@/db/db";

export async function queryMarketplace({ q, category, sortBy }: any) {
  const query = db("marketplace_items")
    .select("*")
    .leftJoin("rewards", "marketplace_items.reward_id", "rewards.id")
    .leftJoin("businesses", "marketplace_items.business_id", "businesses.id")
    .leftJoin(
      "business_categories",
      "businesses.category_id",
      "business_categories.id"
    )
    .where("marketplace_items.status", "live");

  // If using SQLite, we might need to adjust the query for case-insensitive search
  const isSQLite = db.client.config.client === "sqlite3";

  if (q) {
    const lowerQ = `%${q.toLowerCase()}%`;

    query.where((builder) => {
      if (isSQLite) {
        builder
          .whereRaw("LOWER(businesses.business_name) LIKE ?", [lowerQ])
          .orWhereRaw("LOWER(businesses.description) LIKE ?", [lowerQ])
          .orWhereRaw("LOWER(rewards.name) LIKE ?", [lowerQ])
          .orWhereRaw("LOWER(rewards.description) LIKE ?", [lowerQ]);
      } else {
        builder
          .whereILike("businesses.business_name", lowerQ)
          .orWhereILike("businesses.description", lowerQ)
          .orWhereILike("rewards.name", lowerQ)
          .orWhereILike("rewards.description", lowerQ);
      }
    });
  }

  if (category) {
    query.andWhere("business_categories.name", category);
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
