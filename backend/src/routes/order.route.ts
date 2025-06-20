import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.post("/", createOrder);
orderRoutes.get("/", getAllOrders);
orderRoutes.get("/:userId", getOrdersByUserId);
orderRoutes.patch("/:orderId", updateOrder);
orderRoutes.delete("/:orderId", deleteOrder);

export default orderRoutes;
