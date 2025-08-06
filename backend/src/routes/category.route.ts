import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import { validate, createCategorySchema } from "../schemas/validation.js";

const router = express.Router();

router.get("/", getAllCategories);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createCategorySchema),
  createCategory
);

router.patch(
  "/:categoryId",
  authMiddleware,
  adminMiddleware,
  validate(createCategorySchema),
  updateCategory
);

router.delete("/:categoryId", authMiddleware, adminMiddleware, deleteCategory);

export default router;
