// db/seeds/05_seed_reviews.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("business_reviews").del();

  // Fetch existing businesses to map their IDs
  const businesses = await knex("businesses")
    .select("id", "business_name")
    .whereIn("business_name", [
      "Bean & Brew",
      "The Vintage Cut",
      "Rise & Shine Bakery",
      "Iron Temple",
      "Tech Savvy",
      "Green Sip",
      "Grain & Glory",
      "Sound Roots",
      "Greenville Market Co.",
    ]);

  // Helper map
  const businessIdMap = Object.fromEntries(
    businesses.map((b) => [b.business_name, b.id])
  );

  // Inserts seed entries
  await knex("business_reviews").insert([
    {
      rating: 5,
      review: "Amazing service and friendly staff!",
      business_id: businessIdMap["Bean & Brew"],
      reviewer_id: 2,
    },
    {
      rating: 4,
      review: "Great experience, would come again.",
      business_id: businessIdMap["The Vintage Cut"],
      reviewer_id: 1,
    },
    {
      rating: 3,
      review: "Decent overall, but a bit slow.",
      business_id: businessIdMap["Rise & Shine Bakery"],
      reviewer_id: 5,
    },
    {
      rating: 5,
      review: "Highly recommend to everyone!",
      business_id: businessIdMap["Iron Temple"],
      reviewer_id: 3,
    },
    {
      rating: 2,
      review: "Not quite what I expected.",
      business_id: businessIdMap["Tech Savvy"],
      reviewer_id: 6,
    },
    {
      rating: 4,
      review: "Good food and ambiance.",
      business_id: businessIdMap["Green Sip"],
      reviewer_id: 4,
    },
    {
      rating: 5,
      review: "Excellent service and quality!",
      business_id: businessIdMap["Grain & Glory"],
      reviewer_id: 7,
    },
    {
      rating: 3,
      review: "Average, but reasonably priced.",
      business_id: businessIdMap["Sound Roots"],
      reviewer_id: 8,
    },
    {
      rating: 4,
      review: "Good value for money.",
      business_id: businessIdMap["Greenville Market Co."],
      reviewer_id: 9,
    },
    {
      rating: 5,
      review: "Exceptional craftsmanship and detail.",
      business_id: businessIdMap["Bean & Brew"],
      reviewer_id: 10,
    },
    {
      rating: 4,
      review: "Pleasant and helpful staff.",
      business_id: businessIdMap["The Vintage Cut"],
      reviewer_id: 3,
    },
    {
      rating: 2,
      review: "Service was lacking, needs improvement.",
      business_id: businessIdMap["Rise & Shine Bakery"],
      reviewer_id: 1,
    },
    {
      rating: 5,
      review: "Couldn’t have asked for better service!",
      business_id: businessIdMap["Iron Temple"],
      reviewer_id: 2,
    },
    {
      rating: 4,
      review: "Clean, professional, and courteous.",
      business_id: businessIdMap["Tech Savvy"],
      reviewer_id: 4,
    },
    {
      rating: 3,
      review: "Nice place but a little overpriced.",
      business_id: businessIdMap["Green Sip"],
      reviewer_id: 5,
    },
  ]);
}
