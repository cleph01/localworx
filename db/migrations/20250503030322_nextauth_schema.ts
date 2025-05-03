import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("users", (table) => {
      table.string("id").primary();
      table.string("name");
      table.string("email").unique();
      table.timestamp("emailVerified");
      table.string("image");
      // Custom fields
      table.string("role").defaultTo("user"); // You can enforce enum logic in your app code
      table.string("phone_number");
    })
    .createTable("accounts", (table) => {
      table.increments("id").primary();
      table
        .string("userId")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("type").notNullable();
      table.string("provider").notNullable();
      table.string("providerAccountId").notNullable();
      table.string("refresh_token");
      table.string("access_token");
      table.integer("expires_at");
      table.string("token_type");
      table.string("scope");
      table.string("id_token");
      table.string("session_state");
      table.unique(["provider", "providerAccountId"]);
    })
    .createTable("sessions", (table) => {
      table.string("sessionToken").primary();
      table
        .string("userId")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamp("expires").notNullable();
    })
    .createTable("verification_tokens", (table) => {
      table.string("identifier").notNullable();
      table.string("token").notNullable();
      table.timestamp("expires").notNullable();
      table.primary(["identifier", "token"]);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTableIfExists("verification_tokens")
    .dropTableIfExists("sessions")
    .dropTableIfExists("accounts")
    .dropTableIfExists("users");
}
