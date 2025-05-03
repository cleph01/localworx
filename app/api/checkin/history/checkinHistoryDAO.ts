import db from "@/db/db";

export async function getUserCheckInHistory(userId: number) {
  return db("checkins")
    .join("businesses", "checkins.business_id", "businesses.id")
    .select(
      "businesses.id as businessId",
      "businesses.name as businessName",
      "checkins.timestamp",
      "checkins.latitude as checkinLat",
      "checkins.longitude as checkinLng",
      "businesses.latitude as businessLat",
      "businesses.longitude as businessLng"
    )
    .where("checkins.user_id", userId)
    .orderBy("checkins.timestamp", "desc");
}
