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
      image_url:
        "https://plus.unsplash.com/premium_photo-1661645788141-8196a45fb483?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      user_id: 3,
      name: "Free Smoothie with Purchase",
      description:
        "Enjoy a fresh smoothie with any acai bowl at Ella’s Juice Bar.",
      price: 4.0,
      category: "product",
      image_url:
        "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNtb290aGllfGVufDB8fDB8fHww",
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
      image_url:
        "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 5,
      user_id: 6,
      name: "One Free Car Wash",
      description:
        "Redeemable at Henry’s Auto Spa. Exterior and interior cleaning.",
      price: 10.0,
      category: "service",
      image_url:
        "https://plus.unsplash.com/premium_photo-1661495725810-0e92d20311ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwd2FzaHxlbnwwfHwwfHx8MA%3D%3D",
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
      image_url:
        "https://plus.unsplash.com/premium_photo-1661753771722-d7529901a504?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2lsJTIwY2hhbmdlfGVufDB8fDB8fHww",
    },
    {
      id: 8,
      user_id: 9,
      name: "Free Yoga Drop-In Class",
      description: "One-time access to any class at Clara’s Yoga Studio.",
      price: 12.0,
      category: "service",
      image_url:
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW9nYSUyMGNsYXNzfGVufDB8fDB8fHww",
    },
    {
      id: 9,
      user_id: 10,
      name: "Free Gift Wrapping",
      description:
        "Redeem at Alice’s Boutique for one beautifully wrapped gift.",
      price: 5.0,
      category: "service",
      image_url:
        "https://images.unsplash.com/photo-1709364528811-5c920cb3adad?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZlZ2V0YWJsZSUyMHdyYXBwaW5nfGVufDB8fDB8fHww",
    },
  ]);
}
