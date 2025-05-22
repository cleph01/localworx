import knex from "@/db/db";
import { Business } from "./nearbyTypes";

export async function getAllBusinesses(): Promise<Business[]> {
  // This function retrieves all businesses from the database
  try {
    return await knex<Business>("businesses").select(
      "id",
      "name",
      "latitude",
      "longitude"
    );
  } catch (err) {
    console.error("DB Error in getAllBusinesses:", err);
    throw new Error("Failed to retrieve businesses from the database.");
  }
}
