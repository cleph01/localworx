import db from "@/db/db";

export async function queryPromotions({ q, category, sortBy }: any) {
  const query = db("promotions")
    .select("*")
    .leftJoin("businesses", "promotions.business_id", "businesses.id")
    .leftJoin(
      "business_categories",
      "businesses.category_id",
      "business_categories.id"
    )
    .where("promotions.is_active", true)
    .where("businesses.is_active", true);

  // If using SQLite, we might need to adjust the query for case-insensitive search
  const isSQLite = db.client.config.client === "sqlite3";

  if (q) {
    const lowerQ = `%${q.toLowerCase()}%`;

    query.where((builder) => {
      if (isSQLite) {
        builder
          .whereRaw("LOWER(businesses.business_name) LIKE ?", [lowerQ])
          .orWhereRaw("LOWER(businesses.description) LIKE ?", [lowerQ])
          .orWhereRaw("LOWER(promotions.title) LIKE ?", [lowerQ])
          .orWhereRaw("LOWER(promotions.description) LIKE ?", [lowerQ]);
      } else {
        builder
          .whereILike("businesses.business_name", lowerQ)
          .orWhereILike("businesses.description", lowerQ)
          .orWhereILike("promotions.title", lowerQ)
          .orWhereILike("promotions.description", lowerQ);
      }
    });
  }

  if (category) {
    query.andWhere("business_categories.name", category);
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
