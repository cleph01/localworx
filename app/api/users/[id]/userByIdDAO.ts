import db from "@/db/db";

export async function getUserById(id: string) {
  return db("users")
    .where({ id: Number(id) })
    .first();
}
