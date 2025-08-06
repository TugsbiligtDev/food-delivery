import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  validate,
  createOrderSchema,
  updateOrderSchema,
} from "../schemas/validation.schemas.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createOrderSchema), createOrder);
router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.get("/user/:userId", authMiddleware, getOrdersByUserId);
router.patch(
  "/:orderId",
  authMiddleware,
  adminMiddleware,
  validate(updateOrderSchema),
  updateOrder
);
router.delete("/:orderId", authMiddleware, adminMiddleware, deleteOrder);

export default router;
