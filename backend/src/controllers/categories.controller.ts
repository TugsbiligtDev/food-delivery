import { Request, Response } from "express";
import { Category } from "../models/categories.model.js";
import { Food } from "../models/foods.model.js";
export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving categories",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;

    const newCategory = await Category.create({ categoryName });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    const { categoryId } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        categoryName,
      },
      { new: true }
    );
    if (updatedCategory === null) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating category",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const categoryInUse = await Food.findOne({ category: categoryId });

    if (categoryInUse) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category. Foods are using this category",
      });
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting category",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
