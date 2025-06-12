exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id").primary();
  table.string("name").notNullable();
  table.string("email").notNullable();
  table.string("password").notNullable();

  table.timestamp("created_at").defaultTo(knex.fn.now());

  table.enum("role", ["admin", "user"], { useNative: true, enumName: "roles" }).notNullable().defaultTo("user");
}); 


exports.down = knex => knex.schema.dropTable("users");