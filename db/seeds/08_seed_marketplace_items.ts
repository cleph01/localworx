// db/seeds/05_seed_marketplace_items.ts
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("marketplace_items").del();

  await knex("marketplace_items").insert([
    {
      id: 1,
      user_id: 1,
      business_id: 1,
      reward_id: 1,
      reward_issued_id: 1,
      status: "live",
      price: 2.0,
      notes: "Originally priced at $2.99, now on sale for $2.00.",
    },
    {
      id: 2,
      user_id: 1,
      business_id: 2,
      reward_id: 4,
      reward_issued_id: 2,
      status: "live",
      price: 20.0,
      notes: "Originally priced at $25.00, now on sale for $20.00.",
    },
    {
      id: 3,
      user_id: 1,
      business_id: 3,
      reward_id: 7,
      reward_issued_id: 3,
      status: "live",
      price: 3.5,
      notes: "Originally priced at $5.00, now on sale for $3.50.",
    },
    {
      id: 4,
      user_id: 1,
      business_id: 4,
      reward_id: 11,
      reward_issued_id: 4,
      status: "live",
      price: 5.0,
      notes: "Originally priced at $7.00, now on sale for $5.00.",
    },
  ]);
}

// fields i need are:
// id, user_id, business_id, reward_id, status, price, notes
// status can be live, sold, deleted, expired, reserved
// price is a decimal, notes is text
// created_at and updated_at are timestamps, but not needed for seeding
// Make sure to adjust the values as per your requirements
// This is a basic seed file for marketplace_items table
