import db from "@/db/db";

export async function listPromotions() {
  const query = db("promotions").select("*");

  return query;
}
