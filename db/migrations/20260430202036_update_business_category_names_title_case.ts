import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const updates = [
    { id: 1, name: "Coffee Shop" },
    { id: 2, name: "Barber Shop" },
    { id: 3, name: "Bakery" },
    { id: 4, name: "Gym" },
    { id: 5, name: "Tech Repair" },
    { id: 6, name: "Smoothie Bar" },
    { id: 7, name: "Woodworking" },
    { id: 8, name: "Music School" },
    { id: 9, name: "Market" },
    { id: 10, name: "Auto Repair" },
  ];

  for (const { id, name } of updates) {
    await knex("business_categories").where({ id }).update({ name });
  }
}

export async function down(knex: Knex): Promise<void> {
  const reverts = [
    { id: 1, name: "coffee shop" },
    { id: 2, name: "barber shop" },
    { id: 3, name: "bakery" },
    { id: 4, name: "gym" },
    { id: 5, name: "tech repair" },
    { id: 6, name: "smoothie bar" },
    { id: 7, name: "woodworking" },
    { id: 8, name: "music school" },
    { id: 9, name: "market" },
    { id: 10, name: "auto repair" },
  ];

  for (const { id, name } of reverts) {
    await knex("business_categories").where({ id }).update({ name });
  }
}
