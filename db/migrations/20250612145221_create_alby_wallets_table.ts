import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("alby_wallets", (table) => {
    table.increments("id").primary();

    // One of these two will be set
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .unique()
      .nullable();

    table
      .integer("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE")
      .unique()
      .nullable();

    table.string("alby_wallet_id").notNullable();
    table.text("pairing_uri_encrypted").notNullable();

    // created_at and updated_at
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("alby_wallets");
}
