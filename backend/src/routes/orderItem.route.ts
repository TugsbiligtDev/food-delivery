import express from "express";

import {
  getAllOrderItems,
  updateOrderItem,
  deleteFood,
  createOrderItem,
} from "../controllers/orderItem.controller.js";
const orderItemRouter = express.Router();

orderItemRouter.get("/", getAllOrderItems);
orderItemRouter.post("/", createOrderItem);
orderItemRouter.patch("/:orderItemId", updateOrderItem);
orderItemRouter.delete("/:orderItemId", deleteFood);
export default orderItemRouter;
