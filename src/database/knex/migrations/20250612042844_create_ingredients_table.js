exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id").primary();
  table.text("name").notNullable();

  table.timestamp("created_at").defaultTo(knex.fn.now());

  table.integer("dishes_id").references("id").inTable("dishes").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
}); 


exports.down = knex => knex.schema.dropTable("ingredients");