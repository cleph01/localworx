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

    // I'm not sure if onDelete should be CASCADE or SET NULL here
    // it depends on whether we want to keep the wallet record if the business is deleted

    table
      .integer("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE")
      .unique()
      .nullable();

    // Alby wallet ID
    table.string("alby_wallet_id").notNullable();

    // Encrypted pairing URI
    // The pairing URI is used to connect the wallet to the Alby service
    table.text("pairing_uri_encrypted").notNullable();

    // Encrypted pairing secret key
    // This is the secret key used to authenticate the wallet with the Alby service
    table.text("pairing_secret_encrypted").notNullable();

    // The app public key is used to identify the application
    // that created the wallet, such as a business or user app
    // a.k.a Pairing public key
    table.text("app_public_key").notNullable();

    // The relay URL is the URL of the Alby relay server
    // This is used to send and receive payments through the Alby service
    table.string("relay_url").notNullable();

    // The wallet public key is the public key of the Alby wallet
    // This is used to identify the wallet in the Alby service
    // and to perform operations like sending and receiving payments
    table.text("wallet_public_key").notNullable();

    // The LUD16 is a human-readable identifier for the wallet
    // username@domain
    // It is used to identify the wallet in the Alby service
    table.string("wallet_lud16").notNullable().unique();

    // The wallet name is the name of the wallet
    // This is used to identify the wallet in the Alby service
    table.string("wallet_name").notNullable();

    // created_at and updated_at
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("alby_wallets");
}
