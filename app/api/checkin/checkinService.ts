import { CheckInRequest, CheckInResponse } from "./checkinTypes";
import { getBusinessLocation, insertCheckIn } from "./checkinDAO";
import { haversineDistance } from "./haversine";

const MAX_DISTANCE_METERS = 25;

export async function performCheckIn(
  payload: CheckInRequest
): Promise<CheckInResponse> {
  const businessLocation = await getBusinessLocation(payload.businessId);
  if (!businessLocation) {
    return {
      success: false,
      message: "Business not found",
    };
  }

  const userCoords = {
    latitude: payload.latitude,
    longitude: payload.longitude,
  };

  const distance = haversineDistance(userCoords, businessLocation);

  if (distance > MAX_DISTANCE_METERS) {
    return {
      success: false,
      message: "You are too far from the business to check in.",
    };
  }

  await insertCheckIn(payload);

  return {
    success: true,
    message: "Check-in successful!",
  };
}
