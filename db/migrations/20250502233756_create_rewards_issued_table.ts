/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("rewards_issued", (table) => {
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

    // Indicates if the reward has been redeemed
    table.boolean("redeemed").defaultTo(false);

    // Indicates if the reward has been resold
    table.boolean("resold").defaultTo(false);

    // Timestamp for when the reward was granted
    table.timestamp("granted_at").defaultTo(knex.fn.now());
    // created_at, updated_at
    table.timestamps(true, true);
  });
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("rewards_issued");
}
