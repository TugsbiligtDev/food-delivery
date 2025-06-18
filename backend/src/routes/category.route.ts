import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.post("/", createCategory);
categoryRoutes.patch("/:categoryId", updateCategory);
categoryRoutes.delete("/:categoryId", deleteCategory);

export default categoryRoutes;
