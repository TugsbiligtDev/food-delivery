import express, { RequestHandler } from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllCategories as RequestHandler);

router.post(
  "/",
  // verifyToken as RequestHandler,
  createCategory as RequestHandler
);
router.patch(
  "/:categoryId",
  verifyToken as RequestHandler,
  updateCategory as RequestHandler
);
router.delete(
  "/:categoryId",
  verifyToken as RequestHandler,
  deleteCategory as RequestHandler
);

export default router;
