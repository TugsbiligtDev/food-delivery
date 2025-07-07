import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllCategories);

router.post("/", verifyToken as any, createCategory as any);
router.patch("/:categoryId", verifyToken as any, updateCategory as any);
router.delete("/:categoryId", verifyToken as any, deleteCategory as any);

export default router;
