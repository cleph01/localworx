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
    table
      .string("business_id")
      .notNullable()
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");

    // Foreign key to users (reviewer)
    table
      .string("reviewer_id")
      .notNullable()
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
