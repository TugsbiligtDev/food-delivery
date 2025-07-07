import { Request, Response } from "express";
import mongoose from "mongoose";
import { Order } from "../models/index.js";
const { Types } = mongoose;
interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

const isValidId = (id: string) => Types.ObjectId.isValid(id);
const isAdmin = (user: any) => user?.role === "ADMIN";
const error = (res: Response, msg: string, code = 400) =>
  res.status(code).json({ success: false, message: msg });
const serverError = (res: Response, err: any, msg: string) => {
  console.error(`${msg}:`, err);
  error(res, msg, 500);
};
const populateOptions = () => ({
  path: "foodOrderItems.food",
  populate: { path: "category" },
});
const getPopulatedOrder = (id: string) =>
  Order.findById(id).populate("user", "-password").populate(populateOptions());

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { foodOrderItems, totalPrice } = req.body;
    const userId = req.userId;

    const order = await Order.create({
      user: userId,
      foodOrderItems,
      totalPrice,
    });
    const populated = await getPopulatedOrder(order._id.toString());

    res
      .status(201)
      .json({ success: true, message: "Order created", data: populated });
  } catch (err) {
    serverError(res, err, "Create order failed");
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!isAdmin(req.user)) return error(res, "Admin only", 403);

    const orders = await Order.find()
      .populate("user", "-password")
      .populate(populateOptions());

    res.json({ success: true, data: orders });
  } catch (err) {
    serverError(res, err, "Get all orders failed");
  }
};

export const getOrdersByUserId = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const requesterId = req.userId;

    if (!isValidId(userId)) return error(res, "Invalid user ID");
    if (requesterId !== userId && !isAdmin(req.user))
      return error(res, "Access denied", 403);

    const orders = await Order.find({ user: userId })
      .populate(populateOptions())
      .populate("user", "-password");

    res.json({ success: true, data: orders });
  } catch (err) {
    serverError(res, err, "Get user orders failed");
  }
};

export const updateOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const updates = req.body;
    const userId = req.userId;

    if (!isValidId(orderId)) return error(res, "Invalid order ID");

    const order = await Order.findById(orderId);
    if (!order) return error(res, "Order not found", 404);

    const isOwner = order.user.toString() === userId;
    const admin = isAdmin(req.user);

    if (!isOwner && !admin) return error(res, "Unauthorized", 403);

    const updated = await Order.findByIdAndUpdate(orderId, updates, {
      new: true,
      runValidators: true,
    })
      .populate("user", "-password")
      .populate(populateOptions());

    res.json({ success: true, message: "Order updated", data: updated });
  } catch (err) {
    serverError(res, err, "Update order failed");
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;

    if (!isValidId(orderId)) return error(res, "Invalid order ID");
    if (!isAdmin(req.user)) return error(res, "Admin only", 403);

    const deleted = await Order.findByIdAndDelete(orderId);
    if (!deleted) return error(res, "Order not found", 404);

    res.json({ success: true, message: "Order deleted", data: deleted });
  } catch (err) {
    serverError(res, err, "Delete order failed");
  }
};
