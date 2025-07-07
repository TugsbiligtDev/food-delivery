import { Request, Response } from "express";
import { Food } from "../models/index.js";
import mongoose from "mongoose";
const { Types } = mongoose;
interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

const validateObjectId = (id: string): boolean => Types.ObjectId.isValid(id);
const checkAdminRole = (user: any): boolean => user?.role === "ADMIN";
const handleError = (res: Response, error: any, message: string) => {
  console.error(`${message}:`, error);
  res.status(500).json({ success: false, message });
};

const sendUnauthorizedResponse = (res: Response) =>
  res.status(403).json({
    success: false,
    message: "Access denied. Admin privileges required.",
  });

const sendInvalidIdResponse = (res: Response) =>
  res.status(400).json({
    success: false,
    message: "Invalid food ID format",
  });

export const getAllFoods = async (request: Request, response: Response) => {
  try {
    const foods = await Food.find().populate("category");
    response.json({ success: true, data: foods });
  } catch (error) {
    handleError(response, error, "Failed to fetch foods");
  }
};

export const getFoodById = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    if (!validateObjectId(foodId)) return sendInvalidIdResponse(response);

    const food = await Food.findById(foodId).populate("category");
    if (!food) {
      return response
        .status(404)
        .json({ success: false, message: "Food not found" });
    }
    response.json({ success: true, data: food });
  } catch (error) {
    handleError(response, error, "Failed to fetch food");
  }
};

export const createFood = async (request: AuthRequest, response: Response) => {
  try {
    const { foodName, price, image, ingredients, category } = request.body;

    if (!checkAdminRole(request.user))
      return sendUnauthorizedResponse(response);

    const createdFood = await Food.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });
    const populatedFood = await Food.findById(createdFood._id).populate(
      "category"
    );

    response.status(201).json({
      success: true,
      message: "Food created successfully",
      data: populatedFood,
    });
  } catch (error) {
    handleError(response, error, "Failed to create food");
  }
};

export const updateFood = async (request: AuthRequest, response: Response) => {
  try {
    const { foodId } = request.params;
    const updateData = request.body;
    if (!validateObjectId(foodId)) return sendInvalidIdResponse(response);
    if (!checkAdminRole(request.user))
      return sendUnauthorizedResponse(response);

    const updatedFood = await Food.findByIdAndUpdate(foodId, updateData, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!updatedFood) {
      return response
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    response.json({
      success: true,
      message: "Food updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    handleError(response, error, "Failed to update food");
  }
};

export const deleteFood = async (request: AuthRequest, response: Response) => {
  try {
    const { foodId } = request.params;
    if (!validateObjectId(foodId)) return sendInvalidIdResponse(response);
    if (!checkAdminRole(request.user))
      return sendUnauthorizedResponse(response);

    const deletedFood = await Food.findByIdAndDelete(foodId);
    if (!deletedFood) {
      return response
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    response.json({
      success: true,
      message: "Food deleted successfully",
      data: deletedFood,
    });
  } catch (error) {
    handleError(response, error, "Failed to delete food");
  }
};
