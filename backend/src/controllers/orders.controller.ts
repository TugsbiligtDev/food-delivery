import { Response } from "express";
import { Request } from "express";
import { Order } from "../models/orders.model.js";
import { AuthenticatedUser } from "../types/index.js";
import { Food } from "../models/foods.model.js";

interface AuthRequest extends Request {
  user: AuthenticatedUser;
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { foodOrderItems, totalPrice, deliveryAddress, deliveryPhone } =
      req.body;
    const userId = (req as AuthRequest).user._id;

    const foodIds = foodOrderItems.map((item: { food: string }) => item.food);
    const foods = await Food.find({ _id: { $in: foodIds } });

    if (foods.length !== foodOrderItems.length) {
      return res.status(400).json({
        success: false,
        message: "One or more food items not found",
      });
    }

    const calculatedTotal = foodOrderItems.reduce(
      (sum: number, item: { food: string; quantity: number }) => {
        const food = foods.find((f) => f._id.toString() === item.food);
        return sum + (food?.price || 0) * item.quantity;
      },
      0
    );

    if (Math.abs(calculatedTotal - totalPrice) > 0.01) {
      return res.status(400).json({
        success: false,
        message: "Total price mismatch",
        expected: calculatedTotal,
        received: totalPrice,
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
