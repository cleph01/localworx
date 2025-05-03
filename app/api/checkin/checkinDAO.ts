import knex from "../../../db/db";
import { CheckInRequest, Reward } from "./checkinTypes";

// Insert a new check-in into the database
export async function insertCheckIn(data: CheckInRequest): Promise<void> {
  await knex("checkins").insert(data);
}

// Fetch the business location from the database
export async function getBusinessLocation(
  businessId: string
): Promise<{ latitude: number; longitude: number } | null> {
  const business = await knex("businesses")
    .select("latitude", "longitude")
    .where({ id: businessId })
    .first();

  return business ?? null;
}

// Fetch the reward offered by a business
export async function getRewardForBusiness(
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
export async function getUserCheckInCount(
  userId: string,
  businessId: string
): Promise<number> {
  const result = await knex("checkins")
    .where({ user_id: userId, business_id: businessId })
    .count<{ count: string }>("id as count")
    .first();

  return parseInt(result?.count ?? "0", 10);
}

// Grant a reward to a user if they've met the threshold
export async function grantReward(
  userId: string,
  businessId: string
): Promise<void> {
  // Fetch the reward for the business
  const reward = await getRewardForBusiness(businessId);

  if (!reward) {
    return; // No reward found for this business
  }

  // Get the user's check-in count for this business
  const checkInCount = await getUserCheckInCount(userId, businessId);

  // If the user has met the threshold, grant the reward
  if (checkInCount >= reward.threshold) {
    // Insert the reward grant record for the user
    await knex("reward_grants").insert({
      user_id: userId,
      reward_id: reward.id,
    });
  }
}
