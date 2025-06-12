const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishesPhotoController {
  async update(request, response) {
    const user_id = request.user.id;
    const { id } = request.params;
    const photoFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado!", 401);
    }

    if (user.role !== "admin") {
      throw new AppError("Apenas administradores podem atualizar a foto dos pratos.", 403);
    }

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não encontrado!", 404);
    }

    if (dish.photo) {
      await diskStorage.deleteFile(dish.photo);
    }

    const fileName = await diskStorage.saveFile(photoFilename);
    dish.photo = fileName;

    await knex("dishes").where({ id }).update({ photo: fileName });

    return response.json(dish);
  }
}

module.exports = DishesPhotoController;
