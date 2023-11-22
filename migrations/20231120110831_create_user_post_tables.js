/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("full_name");
      table.string("username").unique().notNullable();
      table.text("bio");
      table.boolean("tennis").defaultTo(false);
      table.boolean("football").defaultTo(false);
      table.string("email").unique().notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      table.string("profile_image_url").defaultTo("default_profile_image.jpg");
      table.string("password").notNullable();
    })
    .createTable("post", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .string("user_name")
        .references("user.username")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("content", 1000);
      table.string("sports_type");
      table.integer("likes_count").defaultTo(0);
      table.integer("comments_count").defaultTo(0);
      table.integer("replies_count").defaultTo(0);
      table.timestamp("created_at");
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      table.string("mentions").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("post").dropTable("user");
};
