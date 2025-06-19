import { Request, Response } from "express";
import { Order } from "../models/index.js";

export const createOrder = async (request: Request, response: Response) => {
  try {
    const order = request.body;
    const createdOrder = await Order.create(order);
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
    const orders = await Order.find();
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

export const getOrdersByUserId = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request.params;
    const orders = await Order.find({ user: userId });
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
    const updatedOrder = await Order.find();

    if (!updatedOrder) {
      return response.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

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
