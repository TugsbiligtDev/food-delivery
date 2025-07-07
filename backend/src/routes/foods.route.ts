import express from "express";
import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/foods.controller.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllFoods as any);
router.get("/:foodId", getFoodById as any);

router.post("/", verifyToken as any, createFood as any);
router.patch("/:foodId", verifyToken as any, updateFood as any);
router.delete("/:foodId", verifyToken as any, deleteFood as any);
export default router;
