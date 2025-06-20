import { Request, Response } from "express";
import { Order } from "../models/index.js";

export const createOrder = async (request: Request, response: Response) => {
  try {
    const food = request.body;
    const createdFood = await Order.create(food);

    response.json({
      success: true,
      data: createdFood,
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
      .populate("foodOrderItems")
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
  response.send("GET request");
};

export const updateOrder = async (request: Request, response: Response) => {
  try {
    const { orderId } = request.params;
    const updateData = request.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return response.status(404).json({
        success: false,
        error: "Food not found",
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
export const deleteOrder = async (request: Request, response: Response) => {
  try {
    const { orderId } = request.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return response.status(404).json({
        success: false,
        error: "Food not found",
      });
    }

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
