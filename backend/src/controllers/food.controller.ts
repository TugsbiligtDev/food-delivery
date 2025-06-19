import { Request, Response } from "express";
import { Food } from "../models/index.js";

export const getAllFoods = async (request: Request, response: Response) => {
  try {
    const foods = await Food.find();
    response.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const getFoodByid = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const food = await Food.findById(foodId);

    if (!food) {
      return response.status(404).json({
        success: false,
        error: "Food not found",
      });
    }

    response.json({
      success: true,
      data: food,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const createFood = async (request: Request, response: Response) => {
  try {
    const food = request.body;
    const createdFood = await Food.create(food);
    response.json({
      success: true,
      data: createdFood,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const updateFood = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const updateData = request.body;
    const updatedFood = await Food.find(); //do sth

    if (!updatedFood) {
      return response.status(404).json({
        success: false,
        error: "Food not found",
      });
    }

    response.json({
      success: true,
      data: updatedFood,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const deleteFood = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const deletedFood = await Food.findById(foodId);

    if (!deletedFood) {
      return response.status(404).json({
        success: false,
        error: "Food not found",
      });
    }

    response.json({
      success: true,
      data: deletedFood,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};
