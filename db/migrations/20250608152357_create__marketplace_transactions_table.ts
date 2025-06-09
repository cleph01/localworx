// db/migrations/XXXX_create_marketplace_transactions_table.ts
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("marketplace_transactions", (table) => {
    table.increments("id").primary(); // Primary key

    // Buyer ID (who receives the reward)
    table.integer("buyer_id").notNullable();
    table
      .foreign("buyer_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // Seller ID (who owns the reward)
    table.integer("seller_id").notNullable();
    table
      .foreign("seller_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // Marketplace Item reference
    table.integer("marketplace_item_id").notNullable();
    table
      .foreign("marketplace_item_id")
      .references("id")
      .inTable("marketplace_items")
      .onDelete("CASCADE");

    // RewardsIssued ID - the specific unit of value being transferred
    table.integer("reward_issued_id").notNullable();
    table
      .foreign("reward_issued_id")
      .references("id")
      .inTable("rewards_issued")
      .onDelete("CASCADE");

    // Type of transaction (not limited to "sale")
    table
      .enu("type", ["sale", "gift", "barter", "other"])
      .defaultTo("sale")
      .notNullable();

    // Date and time of transaction
    table.timestamp("executed_at").defaultTo(knex.fn.now());

    // Optional notes or metadata
    table.text("notes").nullable();

    // created_at and updated_at
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("marketplace_transactions");
}
