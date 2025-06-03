import db from "@/db/db";

export async function listBusinesses() {
  const query = db("businesses").select("*");

  return query;
}
