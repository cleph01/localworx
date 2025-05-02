/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

// This migration creates a users table with the following fields:
export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    // UUID primary key to be sent from the client
    table.string("id", 36).primary();
    table.string("name");
    table.string("email").unique().notNullable();
    table.timestamp("emailVerified", { useTz: true }).nullable();
    table.string("image");
    table.timestamps(true, true); // created_at, updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
