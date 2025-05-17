import db from "@/db/db";

export async function listBusinesses(ownerId?: number) {
  const query = db("businesses").select("*");
  if (ownerId) query.where({ owner_id: ownerId });
  return query;
}
