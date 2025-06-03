// db/seeds/14_seed_checkins.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("checkins").del();

  // Fetch existing businesses to map their IDs
  const businesses = await knex("businesses")
    .select("id", "business_name")
    .whereIn("business_name", [
      "Bean & Brew",
      "The Vintage Cut",
      "Rise & Shine Bakery",
      "Iron Temple",
      "Tech Savvy",
      "Green Sip",
      "Grain & Glory",
      "Sound Roots",
      "Greenville Market Co.",
    ]);

  // Helper map
  const businessIdMap = Object.fromEntries(
    businesses.map((b) => [b.business_name, b.id])
  );

  await knex("checkins").insert([
    {
      user_id: 1,
      business_id: businessIdMap["Bean & Brew"],
      latitude: 34.8526,
      longitude: -82.394,
    },
    {
      user_id: 2,
      business_id: businessIdMap["The Vintage Cut"],
      latitude: 34.8541,
      longitude: -82.3923,
    },
    {
      user_id: 3,
      business_id: businessIdMap["Rise & Shine Bakery"],
      latitude: 34.8512,
      longitude: -82.3965,
    },
    {
      user_id: 4,
      business_id: businessIdMap["Iron Temple"],
      latitude: 34.85,
      longitude: -82.393,
    },
    {
      user_id: 5,
      business_id: businessIdMap["Tech Savvy"],
      latitude: 34.855,
      longitude: -82.391,
    },
    {
      user_id: 6,
      business_id: businessIdMap["Green Sip"],
      latitude: 34.857,
      longitude: -82.3955,
    },
    {
      user_id: 7,
      business_id: businessIdMap["Grain & Glory"],
      latitude: 34.8585,
      longitude: -82.3975,
    },
    {
      user_id: 8,
      business_id: businessIdMap["Sound Roots"],
      latitude: 34.859,
      longitude: -82.3985,
    },
    {
      user_id: 9,
      business_id: businessIdMap["Greenville Market Co."],
      latitude: 34.86,
      longitude: -82.399,
    },
  ]);
}
