import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken as any, createOrder as any);
router.get("/", verifyToken as any, getAllOrders as any);
router.get("/user/:userId", verifyToken as any, getOrdersByUserId as any);
router.patch("/:orderId", verifyToken as any, updateOrder as any);
router.delete("/:orderId", verifyToken as any, deleteOrder as any);

export default router;
