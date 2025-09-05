import { Request, Response } from "express";
import { Food } from "../models/foods.model.js";
import { Category } from "../models/categories.model.js";
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
      message: "Error retrieving food",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const createFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, ingredients, image, category } = req.body;
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    const ingredientsString = Array.isArray(ingredients)
      ? ingredients.join(", ")
      : ingredients;

    const newFood = await Food.create({
      foodName,
      price,
      ingredients: ingredientsString,
      image,
      category,
    });

    const populatedFood = await Food.findById(newFood._id).populate("category");

    res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: populatedFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating food",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const { foodId } = req.params;

    const updatedFood = await Food.findByIdAndUpdate(foodId, updateData, {
      new: true,
    }).populate("category");

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

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;

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
