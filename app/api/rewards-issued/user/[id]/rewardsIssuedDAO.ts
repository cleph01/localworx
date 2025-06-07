import db from "@/db/db";

export async function getRewardsIssuedByUserId(id: string) {
  return db("rewards_issued").where({ user_id: Number(id) });
}
