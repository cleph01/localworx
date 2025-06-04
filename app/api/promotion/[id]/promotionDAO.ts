// api/business/create/businessDAO.ts

import db from "@/db/db";

export async function getPromotionById(id: number) {
  return db("promotions").where({ id }).first();
}
