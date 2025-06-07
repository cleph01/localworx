import db from "@/db/db";

export async function getRewardById(id: string) {
  return db("rewards")
    .where({ id: Number(id) })
    .first();
}
