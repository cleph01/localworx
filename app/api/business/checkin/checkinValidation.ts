import { CheckInRequest } from "./checkinTypes";

export function validateCheckInRequest(data: CheckInRequest): void {
  const { latitude, longitude, businessId, userId } = data;

  if (!businessId || !userId) {
    throw new Error("Missing businessId or userId");
  }

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("Invalid latitude or longitude");
  }
}
