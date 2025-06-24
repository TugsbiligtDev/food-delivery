import { Request, Response } from "express";
import { Category } from "../models/index.js";

export const getAllCategories = async (
  request: Request,
  response: Response
) => {
  try {
    const categories = await Category.find().populate("category");
    response.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const createCategory = async (request: Request, response: Response) => {
  try {
    const category = request.body;
    const createdCategory = await Category.create(category);
    response.json({
      success: true,
      data: createdCategory,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const updateCategory = async (request: Request, response: Response) => {
  try {
    const { categoryId } = request.params;
    const updateData = request.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true }
    );

    response.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const deleteCategory = async (request: Request, response: Response) => {
  try {
    const { categoryId } = request.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    response.json({
      success: true,
      data: deletedCategory,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};
