// db/seeds/08_seed_promoter_reviews.ts
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data
  await knex("promoter_reviews").del();

  // Insert sample reviews
  await knex("promoter_reviews").insert([
    {
      id: 1,
      business_id: 1,
      promoter_id: 1,
      rating: 5,
      review:
        "Phenomenal promoter! Our foot traffic doubled thanks to his campaign.",
      is_public: true,
    },
    {
      id: 2,
      business_id: 2,
      promoter_id: 2,
      rating: 4,
      review: "Solid campaign. Would work together again.",
      is_public: true,
    },
    {
      id: 3,
      business_id: 3,
      promoter_id: 3,
      rating: 3,
      review: "Decent reach, but could use better visuals next time.",
      is_public: false,
    },
    {
      id: 4,
      business_id: 1,
      promoter_id: 2,
      rating: 2,
      review:
        "Engagement was lower than expected and communication could improve.",
      is_public: true,
    },
    {
      id: 5,
      business_id: 2,
      promoter_id: 3,
      rating: 5,
      review: "Creative, on-brand, and super responsive!",
      is_public: true,
    },
  ]);
}
