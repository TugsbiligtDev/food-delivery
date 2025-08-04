import express, { RequestHandler } from "express";
import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/foods.controller.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const router = express.Router();

router.get("/", getAllFoods as RequestHandler);
router.get("/:foodId", getFoodById as RequestHandler);

router.post(
  "/",
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  createFood as RequestHandler
);
router.patch(
  "/:foodId",
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  updateFood as RequestHandler
);
router.delete(
  "/:foodId",
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  deleteFood as RequestHandler
);

export default router;
