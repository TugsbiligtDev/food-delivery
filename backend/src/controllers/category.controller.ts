import { Request, Response } from "express";
import mongoose from "mongoose";
import { Category, Food } from "../models/index.js";
import { AuthRequest } from "../middleware/auth.js";

const { Types } = mongoose;

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const foodCount = await Food.countDocuments({ category: category._id });
        return {
          ...category.toObject(),
          count: foodCount,
        };
      })
    );

    res.json({ success: true, data: categoriesWithCount });
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName)
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });

    const exists = await Category.findOne({
      categoryName: { $regex: new RegExp(`^${categoryName.trim()}$`, "i") },
    });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Category already exists" });

    const created = await Category.create({ categoryName });
    res
      .status(201)
      .json({ success: true, message: "Category created", data: created });
  } catch (err) {
    console.error("Failed to create category:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create category" });
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    if (!Types.ObjectId.isValid(categoryId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID" });

    if (!categoryName)
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });

    const exists = await Category.findOne({
      categoryName: { $regex: new RegExp(`^${categoryName.trim()}$`, "i") },
      _id: { $ne: categoryId },
    });
    if (exists)
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });

    const updated = await Category.findByIdAndUpdate(
      categoryId,
      { categoryName },
      { new: true, runValidators: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    res.json({ success: true, message: "Category updated", data: updated });
  } catch (err) {
    console.error("Failed to update category:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to update category" });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId } = req.params;
    if (!Types.ObjectId.isValid(categoryId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID" });

    const deleted = await Category.findByIdAndDelete(categoryId);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    res.json({ success: true, message: "Category deleted", data: deleted });
  } catch (err) {
    console.error("Failed to delete category:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete category" });
  }
};
