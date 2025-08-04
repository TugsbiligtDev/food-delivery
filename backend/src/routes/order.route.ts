import express, { RequestHandler } from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware as RequestHandler,
  createOrder as RequestHandler
);
router.get(
  "/",
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  getAllOrders as RequestHandler
);
router.get(
  "/user/:userId",
  authMiddleware as RequestHandler,
  getOrdersByUserId as RequestHandler
);
router.patch(
  "/:orderId",
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  updateOrder as RequestHandler
);
router.delete(
  "/:orderId",
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  deleteOrder as RequestHandler
);

export default router;
