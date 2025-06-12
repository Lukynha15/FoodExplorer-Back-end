const { Router } = require("express");

const DishesController = require("../controllers/DishesController");
const DishesPhotoController = require("../controllers/DishesPhotoController");
const Authentication = require("../middlewares/Authentication");

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishesPhotoController = new DishesPhotoController();

const dishesRoutes = Router();

dishesRoutes.post("/", Authentication, dishesController.create);
dishesRoutes.get("/", dishesController.indexAll);
dishesRoutes.get("/:id", dishesController.indexOne);
dishesRoutes.delete("/:id", Authentication, dishesController.delete);
dishesRoutes.put("/:id", Authentication, dishesController.update);
dishesRoutes.patch("/photo/:id", Authentication, upload.single("photo"), dishesPhotoController.update);

module.exports = dishesRoutes;