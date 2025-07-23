import express, { RequestHandler } from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken as RequestHandler, createOrder as RequestHandler);
router.get("/", verifyToken as RequestHandler, getAllOrders as RequestHandler);
router.get(
  "/user/:userId",
  verifyToken as RequestHandler,
  getOrdersByUserId as RequestHandler
);
router.patch(
  "/:orderId",
  verifyToken as RequestHandler,
  updateOrder as RequestHandler
);
router.delete(
  "/:orderId",
  verifyToken as RequestHandler,
  deleteOrder as RequestHandler
);

export default router;
