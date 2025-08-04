import { Request, Response } from "express";
import { Food } from "../models/index.js";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/auth.js";

const { Types } = mongoose;

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const foods = await Food.find().populate("category");
    res.json({ success: true, data: foods });
  } catch (err) {
    console.error("Failed to fetch foods:", err);
    res.status(500).json({ success: false, message: "Failed to fetch foods" });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;
    if (!Types.ObjectId.isValid(foodId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid food ID format" });

    const food = await Food.findById(foodId).populate("category");
    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });

    res.json({ success: true, data: food });
  } catch (err) {
    console.error("Failed to fetch food:", err);
    res.status(500).json({ success: false, message: "Failed to fetch food" });
  }
};

export const createFood = async (req: AuthRequest, res: Response) => {
  try {
    const createdFood = await Food.create(req.body);
    const populatedFood = await Food.findById(createdFood._id).populate(
      "category"
    );

    res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: populatedFood,
    });
  } catch (err) {
    console.error("Failed to create food:", err);
    res.status(500).json({ success: false, message: "Failed to create food" });
  }
};

export const updateFood = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId } = req.params;
    if (!Types.ObjectId.isValid(foodId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid food ID format" });

    const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!updatedFood)
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });

    res.json({
      success: true,
      message: "Food updated successfully",
      data: updatedFood,
    });
  } catch (err) {
    console.error("Failed to update food:", err);
    res.status(500).json({ success: false, message: "Failed to update food" });
  }
};

export const deleteFood = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId } = req.params;
    if (!Types.ObjectId.isValid(foodId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid food ID format" });

    const deletedFood = await Food.findByIdAndDelete(foodId);
    if (!deletedFood)
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });

    res.json({
      success: true,
      message: "Food deleted successfully",
      data: deletedFood,
    });
  } catch (err) {
    console.error("Failed to delete food:", err);
    res.status(500).json({ success: false, message: "Failed to delete food" });
  }
};
