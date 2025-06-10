// db/seeds/01_seed_users.ts
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      first_name: "Alice",
      npub: "npub1aliceexample",
      avatar_url: "https://randomuser.me/api/portraits/women/1.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
    {
      id: 2,
      first_name: "Bob",
      npub: "npub1bobexample",
      avatar_url: "https://randomuser.me/api/portraits/men/2.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
    {
      id: 3,
      first_name: "Clara",
      npub: "npub1claraexample",
      avatar_url: "https://randomuser.me/api/portraits/women/3.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
    {
      id: 4,
      first_name: "David",
      npub: "npub1davidexample",
      avatar_url: "https://randomuser.me/api/portraits/men/4.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
    {
      id: 5,
      first_name: "Ella",
      npub: "npub1ellaexample",
      avatar_url: "https://randomuser.me/api/portraits/women/5.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
    {
      id: 6,
      first_name: "Frank",
      npub: "npub1frankexample",
      avatar_url: "https://randomuser.me/api/portraits/men/6.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
    {
      id: 7,
      first_name: "Grace",
      npub: "npub1graceexample",
      avatar_url: "https://randomuser.me/api/portraits/women/7.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
    {
      id: 8,
      first_name: "Henry",
      npub: "npub1henryexample",
      avatar_url: "https://randomuser.me/api/portraits/men/8.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
    {
      id: 9,
      first_name: "Isla",
      npub: "npub1islaexample",
      avatar_url: "https://randomuser.me/api/portraits/women/9.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
    {
      id: 10,
      first_name: "Jack",
      npub: "npub1jackexample",
      avatar_url: "https://randomuser.me/api/portraits/men/10.jpg",
      pairing_uri_encrypted: null,
      wallet_id: null,
    },
  ]);
}
