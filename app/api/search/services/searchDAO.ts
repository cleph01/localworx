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
    .select("*")
    .leftJoin(
      "business_categories",
      "business_categories.id",
      "businesses.category_id"
    );

  // If using SQLite, we might need to adjust the query for case-insensitive search
  const isSQLite = db.client.config.client === "sqlite3";

  if (q) {
    const lowerQ = `%${q.toLowerCase()}%`;

    query.where((builder) => {
      if (isSQLite) {
        builder
          .whereRaw("LOWER(businesses.business_name) LIKE ?", [lowerQ])
          .orWhereRaw("LOWER(businesses.description) LIKE ?", [lowerQ]);
      } else {
        builder
          .whereILike("businesses.business_name", lowerQ)
          .orWhereILike("businesses.description", lowerQ);
      }
    });
  }

  if (category) {
    query.andWhere("business_categories.name", category);
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
