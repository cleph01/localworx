import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("posts", (table) => {
    // Primary key
    table.increments("id").primary();

    // Creator of the post (a registered user)
    table.integer("user_id").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // Title of the post
    table.string("title").notNullable();

    // Content/body of the post
    table.text("description").notNullable();

    // Optional media attachment
    table.string("media_url").nullable(); // image, video, etc.
    table.string("media_type").nullable().checkIn(["image", "video"]);

    // Optional expiration (e.g. for limited-time offers or visibility)
    table.dateTime("expires_at").nullable();

    // Visibility toggle
    table.boolean("is_active").notNullable().defaultTo(true);

    // Optional tags (stored as stringified array via JSON.stringify)
    table.text("tags").nullable();

    // Optional category_id for business/service categorization
    table.integer("category_id").unsigned().nullable();

    // createdAt and updatedAt timestamps
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("posts");
}
