import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("promotions", (table) => {
    // Primary key
    table.increments("id").primary();
    // business_id
    table.integer("business_id").notNullable();
    // Foreign key to business
    table
      .foreign("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");

    // promoter_id
    table.integer("promoter_id").notNullable();
    // Foreign key to promoter
    table
      .foreign("promoter_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    // Title of the promotion
    table.string("title").notNullable();
    // Promotion description
    table.text("description").notNullable();
    // Media URL for the promotion
    table.string("media_url").notNullable();
    // Media type (e.g., image, video)
    table.string("media_type").notNullable().checkIn(["image", "video"]);
    // expiresAt
    table.dateTime("expires_at").notNullable();

    // isActive
    table.boolean("is_active").notNullable().defaultTo(true);

    // Terms and conditions
    table.text("terms_and_conditions").nullable();

    // createdAt and updatedAt timestamps
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("promotions");
}
