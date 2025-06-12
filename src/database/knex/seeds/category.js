exports.seed = async function(knex) {
  await knex('category').del();

  await knex('category').insert([
    { name: 'Refeições' },
    { name: 'Sobremesas' },
    { name: 'Bebidas' }
  ]);
};
