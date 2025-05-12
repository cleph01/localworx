import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("marketplace_items", (table) => {
    table.increments("id").primary(); // Primary key: auto-incrementing ID
    table.string("user_id").notNullable(); // User ID of the person posting the item
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("title").notNullable(); // Title of the marketplace item
    table.text("description").nullable(); // Description of the item
    table.decimal("price", 10, 2).notNullable(); // Price of the item (decimal format)
    table.string("category").notNullable(); // Category of the item (e.g., 'service', 'product', etc.)
    table.timestamps(true, true); // Created_at and updated_at timestamps
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("marketplace_items");
}
