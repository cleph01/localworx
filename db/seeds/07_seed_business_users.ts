// db/seeds/06_seed_business_users.ts
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("business_users").del();

  // Seed entries - assume each business has an owner and a couple of employees/admins
  await knex("business_users").insert([
    {
      id: 1,
      business_id: 1,
      user_id: 1,
      role: "owner",
    },
    {
      id: 2,
      business_id: 1,
      user_id: 2,
      role: "employee",
    },

    {
      id: 3,
      business_id: 2,
      user_id: 3,
      role: "owner",
    },
    {
      id: 4,
      business_id: 2,
      user_id: 4,
      role: "admin",
    },

    {
      id: 5,
      business_id: 3,
      user_id: 5,
      role: "owner",
    },
    {
      id: 6,
      business_id: 3,
      user_id: 6,
      role: "employee",
    },

    {
      id: 7,
      business_id: 4,
      user_id: 7,
      role: "owner",
    },
    {
      id: 8,
      business_id: 4,
      user_id: 8,
      role: "employee",
    },

    {
      id: 9,
      business_id: 5,
      user_id: 9,
      role: "owner",
    },
    {
      id: 10,
      business_id: 5,
      user_id: 10,
      role: "employee",
    },

    {
      id: 11,
      business_id: 6,
      user_id: 2,
      role: "owner",
    },
    {
      id: 12,
      business_id: 6,
      user_id: 3,
      role: "admin",
    },

    {
      id: 13,
      business_id: 7,
      user_id: 4,
      role: "owner",
    },
    {
      id: 14,
      business_id: 7,
      user_id: 5,
      role: "employee",
    },

    {
      id: 15,
      business_id: 8,
      user_id: 6,
      role: "owner",
    },
    {
      id: 16,
      business_id: 8,
      user_id: 7,
      role: "employee",
    },

    {
      id: 17,
      business_id: 9,
      user_id: 8,
      role: "owner",
    },
    {
      id: 18,
      business_id: 9,
      user_id: 9,
      role: "admin",
    },
    {
      id: 19,
      business_id: 10,
      user_id: 10,
      role: "owner",
    },
  ]);
}
