import { Request, Response } from "express";
// import { AuthRequest } from "../middleware/auth.js";
import { Food } from "../models/foods.model.js";
import { Category } from "../models/category.model.js";
export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const foods = await Food.find().populate("category");
    res.status(200).json({
      success: true,
      message: "Foods retrieved successfully",
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving food",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;
    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "Food ID  is required",
      });
    }
    const food = await Food.findById(foodId).populate("category");

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food retrieved successfully",
      data: food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving foods",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const createFood = async (req: AuthRequest, res: Response) => {
  try {
    const { foodName, price, ingredients, image, category } = req.body;
    if (!foodName) {
      return res.status(400).json({
        success: false,
        message: "Food name is required",
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }
    if (!ingredients) {
      return res.status(400).json({
        success: false,
        message: "Ingredients is required",
      });
    }
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const isExist = await Category.findById(category);

    if (!isExist) {
      return res.status(400).json({
        success: false,
        message: "Category  not found",
      });
    }
    const newFood = await Food.create({
      foodName,
      price,
      ingredients,
      image,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: newFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating food",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const updateFood = async (req: AuthRequest, res: Response) => {
  try {
    const food = req.body;
    const { foodId } = req.params;

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "Food ID is required",
      });
    }

    const updatedFood = await Food.findByIdAndUpdate(foodId, food, {
      new: true,
    });

    if (updatedFood === null) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating food",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const deleteFood = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId } = req.params;

    if (!foodId)
      return res
        .status(400)
        .json({ success: false, message: "Food ID is required" });

    const deletedFood = await Food.findByIdAndDelete(foodId);
    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
      data: deletedFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting food",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
