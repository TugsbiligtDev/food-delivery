import { Request, Response } from "express";
import { Order } from "../models/index.js";

export const createOrder = async (request: Request, response: Response) => {
  try {
    const orderData = request.body;
    const createdOrder = await (
      await (await Order.create(orderData)).populate("foodOrderItems")
    ).populate("user");

    response.json({
      success: true,
      data: createdOrder,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};
export const getAllOrders = async (request: Request, response: Response) => {
  try {
    const foods = await Order.find()
      .populate({
        path: "foodOrderItems",
        populate: { path: "food", populate: { path: "category" } },
      })
      .populate("user");

    response.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const getOrdersByUserId = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request.params;
    const orders = await Order.find({ user: userId })
      .populate("foodOrderItems.food")
      .populate("user");

    response.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const updateOrder = async (request: Request, response: Response) => {
  try {
    const { orderId } = request.params;
    const updateData = request.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });

    response.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};
export const deleteOrder = async (request: Request, response: Response) => {
  try {
    const { orderId } = request.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    response.json({
      success: true,
      data: deletedOrder,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};
