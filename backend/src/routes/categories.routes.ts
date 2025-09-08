import express, { Router } from "express";
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
  validateParams,
  createCategorySchema,
  updateCategorySchema,
  mongoIdSchema,
} from "../schemas/validation.schemas.js";
import { z } from "zod";

const router: Router = express.Router();

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
  validateParams(z.object({ categoryId: mongoIdSchema })),
  authMiddleware,
  adminMiddleware,
  validate(updateCategorySchema),
  updateCategory
);

router.delete(
  "/:categoryId",
  validateParams(z.object({ categoryId: mongoIdSchema })),
  authMiddleware,
  adminMiddleware,
  deleteCategory
);

export default router;
