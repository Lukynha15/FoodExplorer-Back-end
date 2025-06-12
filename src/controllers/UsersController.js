const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const bcrypt = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (user) {
      throw new AppError("Email já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    });

    return response.status(201).json();
  }
}

module.exports = UsersController;