import db from "@/db/db";

export async function getPromoterReviewsById(id: string | number) {
  return db("promoter_reviews").where({ promoter_id: Number(id) });
}
