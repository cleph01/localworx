// db/migrations/YYYYMMDDHHMMSS_create_promoter_reviews_table.ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("promoter_reviews", (table) => {
    table.increments("id").primary();

    // FK to businesses
    table
      .integer("business_id")
      .notNullable()
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");

    // FK to users (promoters)
    table
      .integer("promoter_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // Rating (1–5 integer)
    table.integer("rating").notNullable().checkBetween([1, 5]);

    // Optional review text
    table.text("review").nullable();

    // Optional: Is the review public (e.g. can be displayed on the promoter profile)?
    table.boolean("is_public").defaultTo(true);

    // Timestamps
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("promoter_reviews");
}
