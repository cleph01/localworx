// db/seeds/06_seed_rewards_issued.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("rewards_issued").del();

  await knex("rewards_issued").insert([
    // User 1 receives intro-offers from businesses 1–3
    {
      user_id: "1",
      business_id: "1",
      reward_id: "1", // Free Small Coffee
      redeemed: true,
      resold: false,
    },
    {
      user_id: "1",
      business_id: "2",
      reward_id: "4", // First Cut Free
      redeemed: false,
      resold: false,
    },
    {
      user_id: "1",
      business_id: "3",
      reward_id: "7", // Free Croissant
      redeemed: false,
      resold: true,
    },

    // User 2 receives loyalty rewards from businesses 4–6
    {
      user_id: "2",
      business_id: "4",
      reward_id: "10", // Free Dessert
      redeemed: true,
      resold: false,
    },
    {
      user_id: "2",
      business_id: "5",
      reward_id: "13", // Free Screen Protector
      redeemed: false,
      resold: false,
    },
    {
      user_id: "2",
      business_id: "6",
      reward_id: "16", // Buy 5 Smoothies
      redeemed: true,
      resold: false,
    },

    // User 3 receives in-kind rewards from businesses 7–9
    {
      user_id: "3",
      business_id: "7",
      reward_id: "21", // Free Engraving
      redeemed: true,
      resold: true,
    },
    {
      user_id: "3",
      business_id: "8",
      reward_id: "24", // Free String Replacement
      redeemed: false,
      resold: true,
    },
    {
      user_id: "3",
      business_id: "9",
      reward_id: "27", // Free Gift Wrapping
      redeemed: false,
      resold: false,
    },
  ]);
}
// This seed file populates the rewards_issued table with initial data for testing and development purposes.
// It includes a variety of rewards issued to different users from various businesses.
