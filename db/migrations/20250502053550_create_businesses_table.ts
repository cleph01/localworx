/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("businesses", (table: Knex.TableBuilder) => {
    // UUID primary key to be sent from the client
    table.string("id", 36).primary();
    // Basic info
    table.string("name").notNullable();
    table.string("address").notNullable();
    table.string("city").notNullable();
    table.string("state", 2).notNullable(); // e.g., 'SC', 'CA'
    table.string("phone_number");

    // Latitude and longitude with 6 decimal places (standard for GPS precision)
    table.decimal("latitude", 9, 6).notNullable();
    table.decimal("longitude", 9, 6).notNullable();

    // Owner foreign key (assuming a users table with UUIDs)
    table
      .uuid("owner_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // Timestamps
    table.timestamps(true, true); // This will create created_at and updated_at columns
    // Optional: any metadata or notes
    table.text("notes").nullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> {
  // Drop the businesses table if it exists
  // This is the reverse of the up function
  // and is used to rollback the migration
  // when you want to undo the changes made by the up function
  // This is useful for testing or if you want to remove the table
  // from the database
  // In production, be careful with this operation
  // as it will delete all data in the table
  return knex.schema.dropTableIfExists("businesses");
}
