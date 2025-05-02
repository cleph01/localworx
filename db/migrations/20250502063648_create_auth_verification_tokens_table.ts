/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("verification_tokens", (table) => {
    table.string("identifier").notNullable();
    table.string("token").notNullable().primary();
    table.timestamp("expires", { useTz: true }).notNullable();

    table.unique(["identifier", "token"]);
    // created_at, updated_at
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("verification_tokens");
}
