// db/seeds/06_seed_business_users.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("business_users").del();

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

  // Seed entries - assume each business has an owner and a couple of employees/admins
  await knex("business_users").insert([
    {
      id: 1,
      business_id: businessIdMap["Bean & Brew"],
      user_id: 1,
      role: "owner",
    },
    {
      id: 2,
      business_id: businessIdMap["Bean & Brew"],
      user_id: 2,
      role: "employee",
    },

    {
      id: 3,
      business_id: businessIdMap["The Vintage Cut"],
      user_id: 3,
      role: "owner",
    },
    {
      id: 4,
      business_id: businessIdMap["The Vintage Cut"],
      user_id: 4,
      role: "admin",
    },

    {
      id: 5,
      business_id: businessIdMap["Rise & Shine Bakery"],
      user_id: 5,
      role: "owner",
    },
    {
      id: 6,
      business_id: businessIdMap["Rise & Shine Bakery"],
      user_id: 6,
      role: "employee",
    },

    {
      id: 7,
      business_id: businessIdMap["Iron Temple"],
      user_id: 7,
      role: "owner",
    },
    {
      id: 8,
      business_id: businessIdMap["Iron Temple"],
      user_id: 8,
      role: "employee",
    },

    {
      id: 9,
      business_id: businessIdMap["Tech Savvy"],
      user_id: 9,
      role: "owner",
    },
    {
      id: 10,
      business_id: businessIdMap["Tech Savvy"],
      user_id: 10,
      role: "employee",
    },

    {
      id: 11,
      business_id: businessIdMap["Green Sip"],
      user_id: 2,
      role: "owner",
    },
    {
      id: 12,
      business_id: businessIdMap["Green Sip"],
      user_id: 3,
      role: "admin",
    },

    {
      id: 13,
      business_id: businessIdMap["Grain & Glory"],
      user_id: 4,
      role: "owner",
    },
    {
      id: 14,
      business_id: businessIdMap["Grain & Glory"],
      user_id: 5,
      role: "employee",
    },

    {
      id: 15,
      business_id: businessIdMap["Sound Roots"],
      user_id: 6,
      role: "owner",
    },
    {
      id: 16,
      business_id: businessIdMap["Sound Roots"],
      user_id: 7,
      role: "employee",
    },

    {
      id: 17,
      business_id: businessIdMap["Greenville Market Co."],
      user_id: 8,
      role: "owner",
    },
    {
      id: 18,
      business_id: businessIdMap["Greenville Market Co."],
      user_id: 9,
      role: "admin",
    },
  ]);
}
