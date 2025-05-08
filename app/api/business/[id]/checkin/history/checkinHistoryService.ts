import { getUserCheckInHistory } from "./checkinHistoryDAO";
import { CheckInHistoryEntry } from "./checkinHistoryTypes";
import { haversineDistance } from "../../../../lib/haversineDistance";

export async function fetchCheckInHistory(
  userId: number
): Promise<CheckInHistoryEntry[]> {
  const records = await getUserCheckInHistory(userId);

  return records.map((business) => ({
    businessId: business.businessId,
    businessName: business.businessName,
    timestamp: business.timestamp,
    distanceMeters: haversineDistance(
      { latitude: business.checkinLat, longitude: business.checkinLng },
      { latitude: business.businessLat, longitude: business.businessLng }
    ),
  }));
}
