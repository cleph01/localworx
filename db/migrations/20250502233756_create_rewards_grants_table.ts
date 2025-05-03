/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("reward_grants", (table) => {
    // auto-incrementing primary key
    table.increments("id").primary();
    // User who received the reward
    table.string("user_id").notNullable();
    // Business offering the reward
    table.string("business_id").notNullable();
    // Foreign key to rewards table
    table.integer("reward_id").unsigned().notNullable();
    // Timestamp for when the reward was granted
    table.timestamp("granted_at").defaultTo(knex.fn.now());
    // created_at, updated_at
    table.timestamps(true, true);

    // Add foreign key constraint to link to rewards table
    table
      .foreign("reward_id")
      .references("id")
      .inTable("rewards")
      .onDelete("CASCADE");
  });
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("reward_grants");
}
