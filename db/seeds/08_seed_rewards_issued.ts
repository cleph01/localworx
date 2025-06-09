// db/seeds/08_seed_rewards_issued.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("rewards_issued").del();

  await knex("rewards_issued").insert([
    {
      id: 1,
      user_id: 1,
      business_id: 1,
      reward_id: 1,
      status: "selling",
    },
    {
      id: 2,
      user_id: 1,
      business_id: 2,
      reward_id: 4,
      status: "selling",
    },
    {
      id: 3,
      user_id: 1,
      business_id: 3,
      reward_id: 7,
      status: "selling",
    },
    {
      id: 4,
      user_id: 1,
      business_id: 4,
      reward_id: 11,
      status: "selling",
    },
    {
      id: 5,
      user_id: 1,
      business_id: 5,
      reward_id: 14,
      status: "redeemed",
    },
    {
      id: 6,
      user_id: 1,
      business_id: 6,
      reward_id: 17,
      status: "redeemed",
    },
    {
      id: 7,
      user_id: 1,
      business_id: 7,
      reward_id: 21,
      status: "sold",
    },
    {
      id: 8,
      user_id: 1,
      business_id: 8,
      reward_id: 24,
      status: "sold",
    },
    {
      id: 9,
      user_id: 1,
      business_id: 9,
      reward_id: 27,
      status: "active",
    },
    {
      id: 10,
      user_id: 1,
      business_id: 10,
      reward_id: 28,
      status: "active",
    },
  ]);
}
