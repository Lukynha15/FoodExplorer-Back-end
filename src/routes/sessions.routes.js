const { Router } = require("express");

const SessionUserController = require("../controllers/SessionsUserController");

const sessionsController = new SessionUserController();

const sessionsRoutes = Router();

sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;