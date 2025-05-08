/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("rewards", (table) => {
    // auto-incrementing primary key
    table.increments("id").primary();
    // Foreign key to businesses table

    // owner_id and category_id
    table.integer("business_id").unsigned().notNullable;

    // Foreign keys
    table
      .foreign("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");
    // Name of the reward
    table.string("name").notNullable();
    // Description of the reward
    table.text("description");
    // Minimum check-ins required to earn the reward
    table.integer("threshold").notNullable().checkPositive();
    // created_at and updated_at
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("rewards");
}
