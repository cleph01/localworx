import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("wallet", (table) => {
    // Primary key for wallet record
    table.increments("id").primary();
    // User ID of the person holding the reward
    table.string("user_id").notNullable();
    // Foreign key to the users table
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("reward_id").notNullable();
    // Foreign key to the rewards table
    table
      .foreign("reward_id")
      .references("id")
      .inTable("rewards")
      .onDelete("CASCADE");
    // Business ID of the business offering the reward
    table.integer("business_id").notNullable();
    // Foreign key to the businesses table
    table
      .foreign("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");
    // Date when the user acquired the reward
    table.date("acquired_date").notNullable();
    // Status of the reward (e.g., "pending", "redeemed", "resold")
    table.string("status").defaultTo("pending");
    // Can the user resell the reward on the marketplace?
    table.boolean("resellable").defaultTo(true);
    // Created_at and updated_at timestamps
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("wallet");
}
