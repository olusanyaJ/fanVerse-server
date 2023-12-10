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
      table
        .string("profile_image_url")
        .defaultTo(
          "https://images.unsplash.com/photo-1613679074971-91fc27180061?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
        );
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
      table.string("full_name");
      table
        .string("profile_image_url")
        .defaultTo(
          "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        );
      table.string("content", 1000);
      table.string("content_img").defaultTo("");
      table.string("sports_type");
      table.integer("likes_count").defaultTo(0);
      table.integer("comments_count").defaultTo(0);
      table.integer("replies_count").defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      table.string("mentions");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("post").dropTable("user");
};
