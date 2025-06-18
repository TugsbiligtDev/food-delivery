import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
} from "../controllers/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.post("/", createOrder);
orderRoutes.get("/", getAllOrders);
orderRoutes.get("/:userId", getOrdersByUserId);
orderRoutes.patch("/:orderId", updateOrder);

export default orderRoutes;
