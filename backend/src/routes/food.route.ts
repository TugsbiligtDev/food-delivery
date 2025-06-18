import express from "express";
import {
  getAllFoods,
  getFoodByid,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/food.controller.js";

const foodsRoutes = express.Router();

foodsRoutes.get("/", getAllFoods);
foodsRoutes.post("/", createFood);
foodsRoutes.patch("/:foodId", updateFood);
foodsRoutes.delete("/:foodId", deleteFood);
foodsRoutes.get("/:foodId", getFoodByid);

export default foodsRoutes;
