// db/seeds/05_seed_marketplace_items.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("marketplace_items").del();

  await knex("marketplace_items").insert([
    {
      id: 1,
      user_id: 2,
      name: "10% Off Your Next Haircut",
      description:
        "Redeem this discount at Bob's Barbershop. Valid for one visit.",
      price: 5.0,
      category: "service",
      image_url: "https://images.unsplash.com/photo-1603415526960-f7e0328f1d5f",
    },
    {
      id: 2,
      user_id: 3,
      name: "Free Smoothie with Purchase",
      description:
        "Enjoy a fresh smoothie with any acai bowl at Ella’s Juice Bar.",
      price: 4.0,
      category: "product",
      image_url: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    },
    {
      id: 3,
      user_id: 4,
      name: "Free Personal Training Session",
      description:
        "A one-on-one training session at Frank’s Fitness. New clients only.",
      price: 25.0,
      category: "service",
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    },
    {
      id: 4,
      user_id: 5,
      name: "Free Dessert",
      description: "Treat yourself to a dessert on the house at Grace’s Diner.",
      price: 3.0,
      category: "product",
      image_url: "https://images.unsplash.com/photo-1590080875976-7c2f7c7ef5f8",
    },
    {
      id: 5,
      user_id: 6,
      name: "One Free Car Wash",
      description:
        "Redeemable at Henry’s Auto Spa. Exterior and interior cleaning.",
      price: 10.0,
      category: "service",
      image_url: "https://images.unsplash.com/photo-1615986206585-bd0b82c1aee7",
    },
    {
      id: 6,
      user_id: 7,
      name: "Free Muffin with Coffee",
      description:
        "Available at Isla’s Café. Freshly baked muffin with any drink.",
      price: 2.5,
      category: "product",
      image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    },
    {
      id: 7,
      user_id: 8,
      name: "Free Oil Change",
      description:
        "Full synthetic oil change at Jack’s Garage. Limit 1 per customer.",
      price: 30.0,
      category: "service",
      image_url: "https://images.unsplash.com/photo-1626091324326-4980ed8ae79f",
    },
    {
      id: 8,
      user_id: 9,
      name: "Free Yoga Drop-In Class",
      description: "One-time access to any class at Clara’s Yoga Studio.",
      price: 12.0,
      category: "service",
      image_url: "https://images.unsplash.com/photo-1540202404-ce55f3ed2b7f",
    },
    {
      id: 9,
      user_id: 10,
      name: "Free Gift Wrapping",
      description:
        "Redeem at Alice’s Boutique for one beautifully wrapped gift.",
      price: 5.0,
      category: "service",
      image_url: "https://images.unsplash.com/photo-1603575448362-3a3b5df13f65",
    },
  ]);
}
