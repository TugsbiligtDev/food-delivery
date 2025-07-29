import { Request, Response } from "express";
import mongoose from "mongoose";
import { Order } from "../models/index.js";
import { Types } from "mongoose";
interface AuthRequest extends Request {
  userId?: string;
  user?: { role?: string };
}

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.create({ ...req.body, user: req.userId });
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
    res.status(500).json({ success: false, message: "Create order failed" });
    console.error(err);
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    // if (req.user?.role !== "ADMIN")
    //   return res.status(403).json({ success: false, message: "Admin only" });

    const orders = await Order.find()
      .populate("user", "-password")
      .populate({
        path: "foodOrderItems.food",
        populate: { path: "category" },
      });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Get all orders failed" });
    console.error(err);
  }
};

export const getOrdersByUserId = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    if (!Types.ObjectId.isValid(userId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });

    if (req.userId !== userId && req.user?.role !== "ADMIN")
      return res.status(403).json({ success: false, message: "Access denied" });

    const orders = await Order.find({ user: userId })
      .populate("user", "-password")
      .populate({
        path: "foodOrderItems.food",
        populate: { path: "category" },
      });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Get user orders failed" });
    console.error(err);
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

    if (order.user.toString() !== req.userId && req.user?.role !== "ADMIN")
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
    res.status(500).json({ success: false, message: "Update order failed" });
    console.error(err);
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid order ID" });

    if (req.user?.role !== "ADMIN")
      return res.status(403).json({ success: false, message: "Admin only" });

    const deleted = await Order.findByIdAndDelete(orderId);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Order deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete order failed" });
    console.error(err);
  }
};
