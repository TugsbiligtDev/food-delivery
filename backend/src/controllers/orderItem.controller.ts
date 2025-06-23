import { Request, Response } from "express";
import { OrderItem } from "../models/orderItem.model.js";

export const getAllOrderItems = async (
  request: Request,
  response: Response
) => {
  const orderItem = await OrderItem.find().populate("food");
  response.json({
    success: true,
    data: orderItem,
  });
};

export const createOrderItem = async (request: Request, response: Response) => {
  try {
    const OrderItem = request.body;
    const createdOrderItem = await OrderItem.create(OrderItem);
    response.json({
      success: true,
      data: createdOrderItem,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const updateOrderItem = async (request: Request, response: Response) => {
  try {
    const { orderItemId } = request.params;
    const updatedOrderItem = request.body;

    const newOrder = await orderItemId.findByIdAndUpdate(
      orderItemId,
      updatedOrderItem,
      {
        new: true,
      }
    );

    response.json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const deleteFood = async (request: Request, response: Response) => {
  try {
    const { orderItemId } = request.params;
    const deletedOrderItem = await OrderItem.findByIdAndDelete(orderItemId);

    response.json({
      success: true,
      data: deletedOrderItem,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};
