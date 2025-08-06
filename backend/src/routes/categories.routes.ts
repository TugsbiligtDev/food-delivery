import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  validate,
  createCategorySchema,
} from "../schemas/validation.schemas.js";

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
