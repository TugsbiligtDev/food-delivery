import { Response } from "express";
import mongoose from "mongoose";
import { Order } from "../models/index.js";
import { AuthRequest } from "../middleware/auth.js";
import { Types } from "mongoose";

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user?._id });
    const populated = await Order.findById(order._id)
      .populate("user", "-password")
      .populate({
        path: "foodOrderItems.food",
        populate: { path: "category" },
      });
    res
      .status(201)
      .json({ success: true, message: "Order created", data: populated });
  } catch (err) {
    console.error("Failed to create order:", err);
    res.status(500).json({ success: false, message: "Create order failed" });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("user", "-password")
      .populate({
        path: "foodOrderItems.food",
        populate: { path: "category" },
      });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error("Failed to get all orders:", err);
    res.status(500).json({ success: false, message: "Get all orders failed" });
  }
};

export const getOrdersByUserId = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    if (!Types.ObjectId.isValid(userId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });

    if (req.user?._id.toString() !== userId && req.user?.role !== "ADMIN")
      return res.status(403).json({ success: false, message: "Access denied" });

    const orders = await Order.find({ user: userId })
      .populate("user", "-password")
      .populate({
        path: "foodOrderItems.food",
        populate: { path: "category" },
      });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error("Failed to get user orders:", err);
    res.status(500).json({ success: false, message: "Get user orders failed" });
  }
};

export const updateOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    if (!Types.ObjectId.isValid(orderId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid order ID" });

    const order = await Order.findById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    if (
      order.user.toString() !== req.user?._id.toString() &&
      req.user?.role !== "ADMIN"
    )
      return res.status(403).json({ success: false, message: "Unauthorized" });

    const updated = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("user", "-password")
      .populate({
        path: "foodOrderItems.food",
        populate: { path: "category" },
      });
    res.json({ success: true, message: "Order updated", data: updated });
  } catch (err) {
    console.error("Failed to update order:", err);
    res.status(500).json({ success: false, message: "Update order failed" });
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid order ID" });

    const deleted = await Order.findByIdAndDelete(orderId);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Order deleted", data: deleted });
  } catch (err) {
    console.error("Failed to delete order:", err);
    res.status(500).json({ success: false, message: "Delete order failed" });
  }
};
