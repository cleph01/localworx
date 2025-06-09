import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("posts").del();

  await knex("posts").insert([
    {
      id: 1,
      user_id: 1,
      title: "How I Built My Tiny Home",
      description:
        "A short guide to going off-grid and reclaiming independence.",
      media_url:
        "https://images.unsplash.com/photo-1668015642451-a3bb11afb441?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlueSUyMGhvbWV8ZW58MHx8MHx8fDA%3D", // Unsplash
      media_type: "image",
      expires_at: null,
      is_active: true,
      tags: JSON.stringify(["offgrid", "independence", "minimalism"]),
      category_id: null,
    },
    {
      id: 2,
      user_id: 1,
      title: "Tiny Home Life",
      description:
        "Living small, living free. Here's a glimpse of my cabin in the woods.",
      media_url:
        "https://images.unsplash.com/photo-1714711614661-ef5c55d9b5de?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGlueSUyMGhvbWV8ZW58MHx8MHx8fDA%3D",
      media_type: "image",
      expires_at: null,
      is_active: true,
      tags: JSON.stringify(["minimalism", "freedom"]),
      category_id: null,
    },
    {
      id: 3,
      user_id: 2,
      title: "Crafting With Wood",
      description:
        "Some recent pieces I've been working on — handmade and heartfelt.",
      media_url:
        "https://plus.unsplash.com/premium_photo-1664302193681-8f87ec91a5de?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYXJwZW50ZXJ8ZW58MHx8MHx8fDA%3D",
      media_type: "image",
      expires_at: null,
      is_active: true,
      tags: JSON.stringify(["craft", "woodworking"]),
      category_id: null,
    },
    {
      id: 4,
      user_id: 3,
      title: "Homesteading in Motion",
      description:
        "Time-lapse video of raising our first structure from the ground up.",
      media_url: "https://youtu.be/WmYCUljsrDg", // public demo video
      media_type: "video",
      expires_at: null,
      is_active: true,
      tags: JSON.stringify(["homestead", "diy"]),
      category_id: null,
    },
    {
      id: 5,
      user_id: 4,
      title: "Weekend Gardening Update",
      description:
        "A few photos from the early spring growth around the homestead.",
      media_url:
        "https://images.unsplash.com/photo-1536236010565-78fbb2fb25d5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnZXRhYmxlJTIwZ2FyZGVufGVufDB8fDB8fHww",
      media_type: "image",
      expires_at: null,
      is_active: true,
      tags: JSON.stringify(["gardening", "nature"]),
      category_id: null,
    },
    {
      id: 6,
      user_id: 5,
      title: "Decentralize Everything",
      description:
        "Why I believe in building parallel systems outside corporate control.",
      media_url:
        "https://images.unsplash.com/photo-1615506367773-a71e33f5a4e8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvbid0JTIwdHJlYWQlMjBvbiUyMG1lfGVufDB8fDB8fHww",
      media_type: "image",
      expires_at: null,
      is_active: true,
      tags: JSON.stringify(["philosophy", "parallel society"]),
      category_id: null,
    },
    {
      id: 7,
      user_id: 5,
      title: "Reflections on Natural Law",
      description: "An open post on sovereignty, morality, and freedom.",
      media_url: null,
      media_type: null,
      expires_at: null,
      is_active: true,
      tags: JSON.stringify(["philosophy", "natural law"]),
      category_id: null,
    },
  ]);
}
