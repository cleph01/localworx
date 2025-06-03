/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("checkins", (table) => {
    // UUID primary key to be sent from the client
    table.increments("id").primary();

    // user_id and business_id
    table.integer("user_id").notNullable();
    table.integer("business_id").unsigned().notNullable;

    // Foreign keys
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");

    // Location of user when checking in
    table.decimal("latitude", 9, 6).notNullable();
    table.decimal("longitude", 9, 6).notNullable();

    // Timestamp of the check-in
    table.timestamp("checked_in_at", { useTz: true }).defaultTo(knex.fn.now());

    // created_at, updated_at
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("checkins");
}
