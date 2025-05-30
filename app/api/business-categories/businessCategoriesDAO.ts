import db from "@/db/db";

export async function getAllBusinessCategories() {
  return db("business_categories").select("name").orderBy("name");
}
