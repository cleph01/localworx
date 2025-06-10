// db/seeds/05_seed_reviews.ts
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("business_reviews").del();

  // Inserts seed entries
  await knex("business_reviews").insert([
    {
      rating: 5,
      review: "Amazing service and friendly staff!",
      business_id: 1,
      reviewer_id: 2,
    },
    {
      rating: 4,
      review: "Great experience, would come again.",
      business_id: 2,
      reviewer_id: 1,
    },
    {
      rating: 3,
      review: "Decent overall, but a bit slow.",
      business_id: 3,
      reviewer_id: 5,
    },
    {
      rating: 5,
      review: "Highly recommend to everyone!",
      business_id: 4,
      reviewer_id: 3,
    },
    {
      rating: 2,
      review: "Not quite what I expected.",
      business_id: 5,
      reviewer_id: 6,
    },
    {
      rating: 4,
      review: "Good food and ambiance.",
      business_id: 6,
      reviewer_id: 4,
    },
    {
      rating: 5,
      review: "Excellent service and quality!",
      business_id: 7,
      reviewer_id: 7,
    },
    {
      rating: 3,
      review: "Average, but reasonably priced.",
      business_id: 8,
      reviewer_id: 8,
    },
    {
      rating: 4,
      review: "Good value for money.",
      business_id: 9,
      reviewer_id: 9,
    },
    {
      rating: 5,
      review: "Exceptional craftsmanship and detail.",
      business_id: 1,
      reviewer_id: 10,
    },
    {
      rating: 4,
      review: "Pleasant and helpful staff.",
      business_id: 2,
      reviewer_id: 3,
    },
    {
      rating: 2,
      review: "Service was lacking, needs improvement.",
      business_id: 3,
      reviewer_id: 1,
    },
    {
      rating: 5,
      review: "Couldn’t have asked for better service!",
      business_id: 4,
      reviewer_id: 2,
    },
    {
      rating: 4,
      review: "Clean, professional, and courteous.",
      business_id: 10,
      reviewer_id: 4,
    },
    {
      rating: 3,
      review: "Nice place but a little overpriced.",
      business_id: 6,
      reviewer_id: 5,
    },
  ]);
}
