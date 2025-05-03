import knex from "@/db/db";
import { RawCheckInHistoryRecord } from "./checkinHistoryTypes";

// Fetches raw check-in records from the database
export async function getUserCheckInHistory(
  userId: number
): Promise<RawCheckInHistoryRecord[]> {
  try {
    return await knex("checkins")
      .join("businesses", "checkins.business_id", "businesses.id")
      .where("checkins.user_id", userId)
      .select(
        "businesses.id as businessId",
        "businesses.name as businessName",
        "checkins.timestamp as timestamp",
        "checkins.latitude as checkinLat",
        "checkins.longitude as checkinLng",
        "businesses.latitude as businessLat",
        "businesses.longitude as businessLng"
      );
  } catch (err) {
    console.error("DB Error in getUserCheckInHistory:", err);
    throw new Error("Failed to retrieve check-in history.");
  }
}
