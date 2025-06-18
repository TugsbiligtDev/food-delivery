import { Request, Response } from "express";
export const getAllCategories = (request: Request, response: Response) => {
  response.send("food-category/ Get huselt irlee");
};

export const createCategory = (request: Request, response: Response) => {
  response.send("food-category/ Post huselt irlee");
};

export const updateCategory = (request: Request, response: Response) => {
  response.send("food-category/:categoryId Patch huselt irlee");
};

export const deleteCategory = (request: Request, response: Response) => {
  response.send("food-category/:categoryId Delete huselt irlee");
};
