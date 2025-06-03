import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    // id
    table.increments("id").primary();

    // Basic info
    table.string("first_name").notNullable();

    // Nostr identity
    table.string("npub").unique().notNullable();
    table.string("avatar_url").nullable();

    // Optional Lightning wallet details
    table.text("pairing_uri_encrypted").defaultTo(null);
    table.string("wallet_id").defaultTo(null);

    // Created at and updated at timestamps
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
