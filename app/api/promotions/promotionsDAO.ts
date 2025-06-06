// app/api/promotions/promotionsDAO.ts
import db from "@/db/db";

export async function getPromotionsByPromoterId(promoterId: string | number) {
  return db("promotions").where("promoter_id", promoterId).select("*");
}
