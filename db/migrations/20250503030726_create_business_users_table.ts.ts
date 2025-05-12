import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("business_users", (table) => {
    table.increments("id").primary();

    table.string("business_id").notNullable();
    table.string("user_id").notNullable();
    // Foreign key to businesses table
    table
      .foreign("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");
    // Foreign key to users table
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    // Role of the user in the business
    table
      .enu("role", ["owner", "admin", "employee"])
      .notNullable()
      .defaultTo("employee");
    // Timestamp for when the user was added to the business
    table.timestamps(true, true);
    // Prevent duplicates
    table.unique(["business_id", "user_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("business_users");
}
