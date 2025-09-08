"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.createFood = exports.getFoodById = exports.getAllFoods = void 0;
const foods_model_js_1 = require("../models/foods.model.js");
const categories_model_js_1 = require("../models/categories.model.js");
const getAllFoods = async (req, res) => {
    try {
        const foods = await foods_model_js_1.Food.find().populate("category");
        res.status(200).json({
            success: true,
            message: "Foods retrieved successfully",
            data: foods,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving food",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.getAllFoods = getAllFoods;
const getFoodById = async (req, res) => {
    try {
        const { foodId } = req.params;
        const food = await foods_model_js_1.Food.findById(foodId).populate("category");
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving food",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.getFoodById = getFoodById;
const createFood = async (req, res) => {
    try {
        const { foodName, price, ingredients, image, category } = req.body;
        const categoryExists = await categories_model_js_1.Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Category not found",
            });
        }
        const ingredientsString = Array.isArray(ingredients)
            ? ingredients.join(", ")
            : ingredients;
        const newFood = await foods_model_js_1.Food.create({
            foodName,
            price,
            ingredients: ingredientsString,
            image,
            category,
        });
        const populatedFood = await foods_model_js_1.Food.findById(newFood._id).populate("category");
        res.status(201).json({
            success: true,
            message: "Food created successfully",
            data: populatedFood,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating food",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.createFood = createFood;
const updateFood = async (req, res) => {
    try {
        const updateData = req.body;
        const { foodId } = req.params;
        const updatedFood = await foods_model_js_1.Food.findByIdAndUpdate(foodId, updateData, {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating food",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.updateFood = updateFood;
const deleteFood = async (req, res) => {
    try {
        const { foodId } = req.params;
        const deletedFood = await foods_model_js_1.Food.findByIdAndDelete(foodId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting food",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.deleteFood = deleteFood;
