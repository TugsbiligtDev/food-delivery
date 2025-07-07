import { Request, Response } from "express";
import mongoose from "mongoose";
const { Types } = mongoose;
import { Category } from "../models/index.js";

interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

const isValidId = (id: string) => Types.ObjectId.isValid(id);
const isAdmin = (user: any) => user?.role === "ADMIN";
const error = (res: Response, msg: string, code = 400) =>
  res.status(code).json({ success: false, message: msg });
const serverError = (res: Response, err: any, msg: string) => {
  console.error(`${msg}:`, err);
  error(res, msg, 500);
};

const nameRegex = (name: string) => new RegExp(`^${name.trim()}$`, "i");

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (err) {
    serverError(res, err, "Failed to fetch categories");
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) return error(res, "Category name is required");
    if (!isAdmin(req.user)) return error(res, "Admin only", 403);

    const exists = await Category.findOne({
      categoryName: { $regex: nameRegex(categoryName) },
    });
    if (exists) return error(res, "Category already exists", 409);

    const created = await Category.create({
      categoryName: categoryName,
    });
    res
      .status(201)
      .json({ success: true, message: "Category created", data: created });
  } catch (err) {
    serverError(res, err, "Failed to create category");
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    if (!isValidId(categoryId)) return error(res, "Invalid category ID");
    if (!categoryName) return error(res, "Category name is required");
    if (!isAdmin(req.user)) return error(res, "Admin only", 403);

    const exists = await Category.findOne({
      categoryName: { $regex: nameRegex(categoryName) },
      _id: { $ne: categoryId },
    });
    if (exists)
      return error(res, "Category with this name already exists", 409);

    const updated = await Category.findByIdAndUpdate(
      categoryId,
      { categoryName: categoryName },
      { new: true, runValidators: true }
    );
    if (!updated) return error(res, "Category not found", 404);

    res.json({ success: true, message: "Category updated", data: updated });
  } catch (err) {
    serverError(res, err, "Failed to update category");
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId } = req.params;
    if (!isValidId(categoryId)) return error(res, "Invalid category ID");
    if (!isAdmin(req.user)) return error(res, "Admin only", 403);

    const deleted = await Category.findByIdAndDelete(categoryId);
    if (!deleted) return error(res, "Category not found", 404);

    res.json({ success: true, message: "Category deleted", data: deleted });
  } catch (err) {
    serverError(res, err, "Failed to delete category");
  }
};
