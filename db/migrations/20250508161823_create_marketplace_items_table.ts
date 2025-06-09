import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("marketplace_items", (table) => {
    table.increments("id").primary(); // Primary key: auto-incrementing ID

    // User ID of the person posting the item
    table.integer("user_id").notNullable();
    // Foreign key to users
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // RewardsIssued ID to rewards_issued table
    table.integer("reward_issued_id").unsigned().notNullable();
    table
      // Foreign key to rewards_issued
      .foreign("reward_issued_id")
      .references("id")
      .inTable("rewards_issued")
      .onDelete("CASCADE");

    // Reward ID to rewards table
    table.integer("reward_id").unsigned().notNullable();
    // Foreign key to rewards
    table
      .foreign("reward_id")
      .references("id")
      .inTable("rewards")
      .onDelete("CASCADE");

    table.integer("business_id").unsigned().notNullable();
    // Foreign key to businesses
    table
      .foreign("business_id")
      .references("id")
      .inTable("businesses")
      .onDelete("CASCADE");

    // Status of the marketplace item
    table
      .enu("status", ["live", "sold", "deleted", "expired", "reserved"])
      .defaultTo("live")
      .notNullable();

    // Price of the item
    table.decimal("price", 10, 2).notNullable(); // Price of the item (decimal format)

    // Additional notes about the item
    table.text("notes").nullable();
    table.timestamps(true, true); // Created_at and updated_at timestamps
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("marketplace_items");
}
