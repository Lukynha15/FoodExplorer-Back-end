const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { name, description, price, ingredients, category_id } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (user.role !== "admin") {
      throw new AppError("Apenas administradores podem cadastrar pratos.", 403);
    }

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      price,
      user_id,
      category_id
    });

    const ingredientsInsert = ingredients.map(name => {
      return {
        dishes_id: dish_id,
        name,
        user_id
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json({
      dishes_id: dish_id,
      name,
      description,
      price,
      ingredients,
      category_id,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, price, category_id, ingredients } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (user.role !== "admin") {
      throw new AppError("Apenas administradores podem editar pratos.", 403);
    }

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404);
    }

    await knex("dishes").where({ id }).update({
      name,
      description,
      price,
      category_id
    });

    if (ingredients && ingredients.length > 0) {
      await knex("ingredients").where({ dishes_id: id }).del();

      const ingredientsInsert = ingredients.map(name => ({
        name,
        dishes_id: id,
        user_id
      }));

      await knex("ingredients").insert(ingredientsInsert);
    }

    return response.json("Prato atualizado com sucesso!");
  }

  async indexAll(request, response) {

    const dishes = await knex("dishes").select("*");

    return response.json(dishes);
  }

  async indexOne(request, response) {

    const { id } = request.params;

    const dishes = await knex("dishes").where({ id }).first();

    return response.status(200).json(dishes);
  }

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (user.role !== "admin") {
      throw new AppError("Apenas administradores podem excluir pratos.", 403);
    }

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato nao encontrado.", 404);
    }

    await knex("dishes").where({ id }).delete();

    return response.json("Prato excluido com sucesso.");
  }
}

module.exports = DishesController;