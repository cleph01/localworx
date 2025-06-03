// api/business/create/businessDAO.ts

import db from "@/db/db";

export async function getBusinessCategory(id: number) {
  return db("business_categories").where({ id }).first();
}
