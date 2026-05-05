import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("lnbits_wallets", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .nullable();

    table
      .integer("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE")
      .unique()
      .nullable();

    // The wallet ID assigned by LNbits
    table.string("lnbits_wallet_id").notNullable().unique();

    // Admin key — can create invoices AND pay invoices. Stored encrypted, never sent to client.
    table.text("admin_key_encrypted").notNullable();

    // Invoice key — can only create invoices and check balance. Stored encrypted, never sent to client.
    table.text("invoice_key_encrypted").notNullable();

    table.string("wallet_name").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("lnbits_wallets");
}
