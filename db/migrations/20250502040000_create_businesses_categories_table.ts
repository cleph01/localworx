// db/migrations/2025-05-05T074244_add_business_categories.ts
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("business_categories", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("business_categories");
}
