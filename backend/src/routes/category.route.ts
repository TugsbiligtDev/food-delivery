import express, { RequestHandler } from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const router = express.Router();

router.get("/", getAllCategories as RequestHandler);

router.post(
  "/",
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  createCategory as RequestHandler
);
router.patch(
  "/:categoryId",
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  updateCategory as RequestHandler
);
router.delete(
  "/:categoryId",
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  deleteCategory as RequestHandler
);

export default router;
