// db/seeds/02_seed_business_categories.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("business_categories").del();

  await knex("business_categories").insert([
    { id: 1, name: "coffee shop" },
    { id: 2, name: "barber shop" },
    { id: 3, name: "bakery" },
    { id: 4, name: "gym" },
    { id: 5, name: "tech repair" },
    { id: 6, name: "smoothie bar" },
    { id: 7, name: "woodworking" },
    { id: 8, name: "music school" },
    { id: 9, name: "market" },
  ]);
}
