const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function Authentication(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = { id: Number(user_id), role };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}

module.exports = Authentication;