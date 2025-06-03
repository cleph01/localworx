// db/seeds/05_seed_rewards.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("rewards").del();

  // Inserts seed entries
  await knex("rewards").insert([
    {
      id: 1,
      business_id: 1,
      name: "10% Off Your Next Haircut",
      description:
        "Show your loyalty and receive a 10% discount on your next cut.",
      image_url: "https://images.unsplash.com/photo-1603415526960-f7e0328f1d5f", // barbershop
      reward_type: "loyalty",
      threshold: 5,
    },
    {
      id: 2,
      business_id: 2,
      name: "Free Smoothie with Purchase",
      description: "Get a delicious smoothie free with any bowl purchase.",
      image_url: "https://images.unsplash.com/photo-1551024601-bec78aea704b", // smoothie
      reward_type: "in-kind",
      threshold: null,
    },
    {
      id: 3,
      business_id: 3,
      name: "Free Personal Training Session",
      description:
        "Claim a complimentary one-on-one session with a certified coach.",
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", // gym
      reward_type: "in-kind",
      threshold: null,
    },
    {
      id: 4,
      business_id: 4,
      name: "Free Dessert",
      description: "Get a dessert of your choice free with your entree.",
      image_url: "https://images.unsplash.com/photo-1590080875976-7c2f7c7ef5f8", // dessert
      reward_type: "loyalty",
      threshold: 3,
    },
    {
      id: 5,
      business_id: 5,
      name: "One Free Car Wash",
      description: "Enjoy a free full-service car wash on us.",
      image_url: "https://images.unsplash.com/photo-1615986206585-bd0b82c1aee7", // car wash
      reward_type: "in-kind",
      threshold: null,
    },
    {
      id: 6,
      business_id: 6,
      name: "Free Muffin with Coffee",
      description: "Receive a fresh muffin with any coffee order.",
      image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587", // coffee and muffin
      reward_type: "loyalty",
      threshold: 4,
    },
    {
      id: 7,
      business_id: 7,
      name: "Free Oil Change",
      description: "Get your vehicle's oil changed free of charge.",
      image_url: "https://images.unsplash.com/photo-1626091324326-4980ed8ae79f", // garage/tools
      reward_type: "in-kind",
      threshold: null,
    },
    {
      id: 8,
      business_id: 8,
      name: "Free Yoga Drop-In Class",
      description: "Join any yoga class for free, no membership needed.",
      image_url: "https://images.unsplash.com/photo-1540202404-ce55f3ed2b7f", // yoga
      reward_type: "loyalty",
      threshold: 6,
    },
    {
      id: 9,
      business_id: 9,
      name: "Free Gift Wrapping",
      description: "Get one item wrapped professionally for free.",
      image_url: "https://images.unsplash.com/photo-1603575448362-3a3b5df13f65", // gift wrapping
      reward_type: "in-kind",
      threshold: null,
    },
  ]);
}
