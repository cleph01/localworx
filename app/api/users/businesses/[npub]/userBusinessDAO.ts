import db from "@/db/db";

export async function getBusinessesByOwnerNpub(npub: string) {
  const user = await db("users").where({ npub }).first("id");
  if (!user) return [];

  return db("businesses").where({ owner_id: user.id }).select("*");
}
