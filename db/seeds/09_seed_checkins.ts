// db/seeds/14_seed_checkins.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("checkins").del();

  await knex("checkins").insert([
    {
      user_id: 1,
      business_id: 1,
      latitude: 34.8526,
      longitude: -82.394,
    },
    {
      user_id: 2,
      business_id: 2,
      latitude: 34.8541,
      longitude: -82.3923,
    },
    {
      user_id: 3,
      business_id: 3,
      latitude: 34.8512,
      longitude: -82.3965,
    },
    {
      user_id: 4,
      business_id: 4,
      latitude: 34.85,
      longitude: -82.393,
    },
    {
      user_id: 5,
      business_id: 5,
      latitude: 34.855,
      longitude: -82.391,
    },
    {
      user_id: 6,
      business_id: 6,
      latitude: 34.857,
      longitude: -82.3955,
    },
    {
      user_id: 7,
      business_id: 7,
      latitude: 34.8585,
      longitude: -82.3975,
    },
    {
      user_id: 8,
      business_id: 8,
      latitude: 34.859,
      longitude: -82.3985,
    },
    {
      user_id: 9,
      business_id: 9,
      latitude: 34.86,
      longitude: -82.399,
    },
    {
      user_id: 10,
      business_id: 10,
      latitude: 34.861,
      longitude: -82.4005,
    },
  ]);
}
