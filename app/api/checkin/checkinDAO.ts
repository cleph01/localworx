import knex from "../../../db/db";
import { CheckInRequest, Reward } from "./checkinTypes";
import { Coordinates } from "./checkinTypes"; // Import Coordinates

// Insert a new check-in into the database
export async function insertCheckInToDB(data: CheckInRequest): Promise<void> {
  await knex("checkins").insert(data);
}

// Fetch the business location from the database
export async function getBusinessLocationFromDB(
  businessId: string
): Promise<Coordinates | null> {
  const business = await knex("businesses")
    .select("latitude", "longitude")
    .where({ id: businessId })
    .first();

  return business ?? null;
}

// Fetch the reward offered by a business
export async function getRewardForBusinessFromDB(
  businessId: string
): Promise<Reward | null> {
  const reward = await knex("rewards")
    .select(
      "id",
      "business_id as businessId",
      "name",
      "description",
      "threshold"
    )
    .where({ business_id: businessId })
    .first();

  return reward ?? null;
}

// Count user check-ins for this business
export async function getUserCheckInCountForBusiness(
  userId: string,
  businessId: string
): Promise<number> {
  const result = await knex("checkins")
    .where({ user_id: userId, business_id: businessId })
    .count<{ count: string }>("id as count")
    .first();

  return parseInt(result?.count ?? "0", 10);
}

// Grant a reward to a user by inserting a record in the reward_grants table
export async function grantRewardToUser(
  userId: string,
  rewardId: string
): Promise<void> {
  await knex("reward_grants").insert({
    user_id: userId,
    reward_id: rewardId,
    granted_at: knex.fn.now(), // Assuming your database has a NOW() function
  });
}
