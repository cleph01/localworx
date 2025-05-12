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
    // Foreign key to users table
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    // Business offering the reward
    table.string("business_id").notNullable();
    // Foreign key to businesses table
    table
      .foreign("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");
    // Reward ID
    table.string("reward_id").notNullable();
    // Foreign key to rewards table
    table
      .foreign("reward_id")
      .references("id")
      .inTable("rewards")
      .onDelete("CASCADE");
    // Timestamp for when the reward was granted
    table.timestamp("granted_at").defaultTo(knex.fn.now());
    // created_at, updated_at
    table.timestamps(true, true);
  });
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("reward_grants");
}
