// db/seeds/07_seed_rewards_issued.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("rewards_issued").del();

  // Inserts mock reward issuance records
  await knex("rewards_issued").insert([
    {
      id: 1,
      user_id: "2",
      business_id: "1",
      reward_id: "1",
      redeemed: false,
      resold: false,
    },
    {
      id: 2,
      user_id: "3",
      business_id: "1",
      reward_id: "2",
      redeemed: true,
      resold: false,
    },
    {
      id: 3,
      user_id: "4",
      business_id: "2",
      reward_id: "3",
      redeemed: false,
      resold: true,
    },
    {
      id: 4,
      user_id: "5",
      business_id: "3",
      reward_id: "4",
      redeemed: true,
      resold: true,
    },
    {
      id: 5,
      user_id: "6",
      business_id: "4",
      reward_id: "5",
      redeemed: false,
      resold: false,
    },
    {
      id: 6,
      user_id: "7",
      business_id: "5",
      reward_id: "6",
      redeemed: true,
      resold: false,
    },
    {
      id: 7,
      user_id: "8",
      business_id: "6",
      reward_id: "7",
      redeemed: false,
      resold: false,
    },
    {
      id: 8,
      user_id: "9",
      business_id: "7",
      reward_id: "8",
      redeemed: false,
      resold: true,
    },
    {
      id: 9,
      user_id: "10",
      business_id: "8",
      reward_id: "9",
      redeemed: true,
      resold: true,
    },
  ]);
}
