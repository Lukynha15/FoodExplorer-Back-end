const { Router } = require("express");

const DishesController = require("../controllers/DishesController");
const DishesPhotoController = require("../controllers/DishesPhotoController");
const Authentication = require("../middlewares/Authentication");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishesPhotoController = new DishesPhotoController();

const dishesRoutes = Router();



dishesRoutes.post("/",  Authentication, verifyUserAuthorization("admin"), upload.single("photo"), dishesController.create);
dishesRoutes.get("/", Authentication, dishesController.indexAll);
dishesRoutes.get("/:id", Authentication, dishesController.indexOne);
dishesRoutes.delete("/:id", Authentication, verifyUserAuthorization("admin"), dishesController.delete);
dishesRoutes.put("/:id", Authentication, verifyUserAuthorization("admin"), dishesController.update);
dishesRoutes.patch("/photo/:id", Authentication, verifyUserAuthorization("admin"), upload.single("photo"), dishesPhotoController.update);

module.exports = dishesRoutes;