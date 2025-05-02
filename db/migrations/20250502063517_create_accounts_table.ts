/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("accounts", (table) => {
    // UUID primary key to be sent from the client
    table.string("id", 36).primary();
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("type").notNullable(); // 'oauth' or 'email'
    table.string("provider").notNullable(); // e.g. 'google'
    table.string("providerAccountId").notNullable();
    table.string("refresh_token");
    table.string("access_token");
    table.timestamp("expires_at");
    table.string("token_type");
    table.string("scope");
    table.string("id_token");
    table.string("session_state");
    table.jsonb("extra_data");

    table.unique(["provider", "providerAccountId"]);
    // created_at, updated_at
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("accounts");
}
