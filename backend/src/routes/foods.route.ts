import express, { RequestHandler } from "express";
import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/foods.controller.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllFoods as RequestHandler);
router.get("/:foodId", getFoodById as RequestHandler);

router.post("/", verifyToken as RequestHandler, createFood as RequestHandler);
router.patch(
  "/:foodId",
  verifyToken as RequestHandler,
  updateFood as RequestHandler
);
router.delete(
  "/:foodId",
  verifyToken as RequestHandler,
  deleteFood as RequestHandler
);

export default router;
