import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("rewards", (table) => {
    // auto-incrementing primary key
    table.increments("id").primary();
    // Foreign key to businesses table

    // owner_id and category_id
    table.integer("business_id").notNullable();

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
    // URL of the reward image
    table.string("image_url").nullable();
    // 'loyalty' or 'in-kind'
    table.string("reward_type").notNullable();
    // Minimum check-ins required to earn the reward
    // Allow NULL for in-kind rewards
    table.integer("threshold").nullable();
    // created_at and updated_at
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("rewards");
}
