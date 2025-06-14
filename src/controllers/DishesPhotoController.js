const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishesPhotoController {
  
  async update(request, response) {
    const user_id = request.user.id;
    const { id } = request.params;

    if (!request.file) {
      throw new AppError("Arquivo da foto não enviado.", 400);
    }

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

    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    const fileName = await diskStorage.saveFile(photoFilename);

    await knex("dishes").where({ id }).update({ photo: fileName });

    const updatedDish = await knex("dishes").where({ id }).first();

    return response.json(updatedDish);
  }

}

module.exports = DishesPhotoController;
