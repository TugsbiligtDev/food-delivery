"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getAllCategories = void 0;
const categories_model_js_1 = require("../models/categories.model.js");
const foods_model_js_1 = require("../models/foods.model.js");
const getAllCategories = async (_req, res) => {
    try {
        const categories = await categories_model_js_1.Category.find();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: categories,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving categories",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.getAllCategories = getAllCategories;
const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const newCategory = await categories_model_js_1.Category.create({ categoryName });
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating category",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const { categoryId } = req.params;
        const updatedCategory = await categories_model_js_1.Category.findByIdAndUpdate(categoryId, {
            categoryName,
        }, { new: true });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating category",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const categoryInUse = await foods_model_js_1.Food.findOne({ category: categoryId });
        if (categoryInUse) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete category. Foods are using this category",
            });
        }
        const deletedCategory = await categories_model_js_1.Category.findByIdAndDelete(categoryId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting category",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categories.controller.js.map