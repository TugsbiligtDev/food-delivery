import express from "express";
import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/foods.controller.js";

const foodsRoutes = express.Router();

foodsRoutes.get("/", getAllFoods);
foodsRoutes.get("/:foodId", getFoodById);
foodsRoutes.post("/", createFood);
foodsRoutes.patch("/:foodId", updateFood);
foodsRoutes.delete("/:foodId", deleteFood);

export default foodsRoutes;
