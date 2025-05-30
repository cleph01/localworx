import db from "@/db/db";

// Assumes a `promotions` table with `promoter_id` or similar user reference
export async function getPromotionsByOwnerNpub(npub: string) {
  const user = await db("users").where({ npub }).first("id");
  if (!user) return [];

  return db("promotions")
    .where({ promoter_id: user.id }) // or business_id if needed
    .select("*");
}
