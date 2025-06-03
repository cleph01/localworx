import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("business_reviews", (table) => {
    // Primary key
    table.increments("id").primary();

    // Rating (e.g., 1 to 5 stars)
    table.integer("rating").notNullable();

    // Optional review text
    table.text("review").nullable();

    // Foreign key to businesses
    table.integer("business_id").notNullable(); // User ID of the person posting the item
    table
      .foreign("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");

    // Foreign key to users (reviewer)
    table.integer("reviewer_id").notNullable(); // User ID of the person posting the item
    table
      .foreign("reviewer_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // Timestamps
    table.timestamps(true, true); // Adds created_at and updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("business_reviews");
}
