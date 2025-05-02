/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("sessions", (table) => {
    table.string("sessionToken").primary();
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("expires", { useTz: true }).notNullable();
    // created_at, updated_at
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("sessions");
}
