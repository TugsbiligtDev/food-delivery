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
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};

export const getFoodByid = (request: Request, response: Response) => {
  response.send("food/:foodId Get huselt irlee");
};

export const createFood = async (request: Request, response: Response) => {
  try {
    const createdFood = await Food.create({
      foodName: "lasagna",
      price: 9999,
      image: "lasagna.png",
      ingredients:
        "frozen cheese ravioli, marinara sauce, and mozzarella cheese.",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    response.json({
      success: true,
      data: createdFood,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Failed to create food",
      error: (error as Error).message,
    });
  }
};

export const updateFood = (request: Request, response: Response) => {
  response.send("food/:foodId Patch huselt irlee");
};

export const deleteFood = (request: Request, response: Response) => {
  response.send("food/:foodId Delete huselt irlee");
};
