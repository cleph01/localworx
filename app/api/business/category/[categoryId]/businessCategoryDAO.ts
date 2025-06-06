import db from "@/db/db";

export async function getBusinessCategory(categoryId?: number) {
  const query = db("business_categories").select("*");
  if (categoryId) query.where({ id: categoryId }).first();
  return query;
}
