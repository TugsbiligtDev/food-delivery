import express from "express";
import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/foods.controller.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import {
  validate,
  createFoodSchema,
  updateFoodSchema,
} from "../schemas/validation.js";

const router = express.Router();

router.get("/", getAllFoods);
router.get("/:foodId", getFoodById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createFoodSchema),
  createFood
);

router.patch(
  "/:foodId",
  authMiddleware,
  adminMiddleware,
  validate(updateFoodSchema),
  updateFood
);

router.delete("/:foodId", authMiddleware, adminMiddleware, deleteFood);

export default router;
