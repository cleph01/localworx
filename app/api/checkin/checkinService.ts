import { CheckInRequest, CheckInResponse, Reward } from "./checkinTypes";
import {
  getBusinessLocationFromDB,
  insertCheckInToDB,
  getRewardForBusinessFromDB,
  getUserCheckInCountForBusiness,
  grantRewardToUser,
} from "./checkinDAO";
import { haversineDistance } from "../lib/haversineDistance";

const MAX_DISTANCE_METERS = 25;

export async function checkInUser(
  payload: CheckInRequest
): Promise<CheckInResponse> {
  // Fetch the business location to validate the check-in distance
  const businessLocation = await getBusinessLocationFromDB(payload.businessId);
  if (!businessLocation) {
    return { success: false, message: "Business not found" };
  }

  // Calculate the distance from the business location
  const userCoords = {
    latitude: payload.latitude,
    longitude: payload.longitude,
  };

  const distance = haversineDistance(userCoords, businessLocation);

  // Check if the user is within the valid distance to check in
  if (distance > MAX_DISTANCE_METERS) {
    return {
      success: false,
      message: "You are too far from the business to check in.",
    };
  }

  // Insert the check-in record in the database
  await insertCheckInToDB(payload);

  // Fetch the reward details for the business
  const reward = await getRewardForBusinessFromDB(payload.businessId);
  if (reward) {
    // Get the count of check-ins for the user at the business
    const checkInCount = await getUserCheckInCountForBusiness(
      payload.userId,
      payload.businessId
    );

    // If the user's check-in count meets or exceeds the threshold, grant the reward
    if (checkInCount >= reward.threshold) {
      await grantRewardToUser(payload.userId, reward.id);
      return {
        success: true,
        message: `Check-in successful! You've earned a reward: ${reward.name}`,
      };
    }
  }

  return { success: true, message: "Check-in successful!" };
}
