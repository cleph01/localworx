// db/seeds/02_seed_business_categories.ts
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("business_categories").del();

  await knex("business_categories").insert([
    { id: 1, name: "Coffee Shop" },
    { id: 2, name: "Barber Shop" },
    { id: 3, name: "Bakery" },
    { id: 4, name: "Gym" },
    { id: 5, name: "Tech Repair" },
    { id: 6, name: "Smoothie Bar" },
    { id: 7, name: "Woodworking" },
    { id: 8, name: "Music School" },
    { id: 9, name: "Market" },
    { id: 10, name: "Auto Repair" },
  ]);
}
