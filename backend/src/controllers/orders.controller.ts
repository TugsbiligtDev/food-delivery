import { Response } from "express";
import { Request } from "express";
import { Order } from "../models/orders.model.js";
import { AuthenticatedUser } from "../types/index.js";

interface AuthRequest extends Request {
  user: AuthenticatedUser;
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { foodOrderItems, totalPrice, deliveryAddress, deliveryPhone } =
      req.body;
    const userId = (req as AuthRequest).user._id;

    if (
      !foodOrderItems ||
      !Array.isArray(foodOrderItems) ||
      foodOrderItems.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Food order items are required",
      });
    }

    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total price is required and must be greater than 0",
      });
    }

    if (!deliveryAddress || !deliveryPhone) {
      return res.status(400).json({
        success: false,
        message: "Delivery address and phone are required",
      });
    }

    const newOrder = new Order({
      user: userId,
      foodOrderItems,
      totalPrice,
      deliveryAddress,
      deliveryPhone,
      status: "PENDING",
    });

    const savedOrder = await newOrder.save();
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("foodOrderItems.food")
      .populate("user");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("foodOrderItems.food")
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const authReq = req as AuthRequest;
    const currentUserId = authReq.user._id.toString();

    if (userId !== currentUserId && authReq.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only view your own orders.",
      });
    }

    const orders = await Order.find({ user: userId })
      .populate("foodOrderItems.food")
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updateData = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const currentOrder = await Order.findById(orderId);

    if (!currentOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    })
      .populate("foodOrderItems.food")
      .populate("user");

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
