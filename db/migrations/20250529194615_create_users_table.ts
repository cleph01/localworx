import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    // id
    table.increments("id").primary();

    // Basic info
    table.string("first_name").notNullable();
    table.string("email").notNullable().unique();
    table.boolean("email_verified").defaultTo(false);

    // Nostr identity
    table.string("npub").unique().notNullable();

    // Optional Lightning wallet details
    table.text("pairing_uri_encrypted").nullable();
    table.string("wallet_id").nullable();
    table.boolean("wallet_created").defaultTo(false);

    // Timestamps
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
