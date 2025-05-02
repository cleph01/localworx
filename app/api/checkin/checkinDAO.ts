import knex from "../../../db/db";
import { CheckInRequest } from "./checkinTypes";

export async function insertCheckIn(data: CheckInRequest): Promise<void> {
  await knex("checkins").insert(data);
}

export async function getBusinessLocation(
  businessId: string
): Promise<{ latitude: number; longitude: number } | null> {
  const business = await knex("businesses")
    .select("latitude", "longitude")
    .where({ id: businessId })
    .first();

  return business ?? null;
}
