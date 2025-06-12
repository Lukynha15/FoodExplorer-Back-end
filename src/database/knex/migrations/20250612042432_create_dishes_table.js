exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id").primary();
  table.text("name").notNullable();
  table.text("description");
  table.decimal('price', 10, 2).notNullable();
  table.text("photo");

  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());

  table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
  table.integer('category_id').references('id').inTable('category').notNullable().onDelete('RESTRICT');
}); 


exports.down = knex => knex.schema.dropTable("dishes");