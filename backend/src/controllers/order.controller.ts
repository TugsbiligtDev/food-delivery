import { Request, Response } from "express";
export const createOrder = (request: Request, response: Response) => {
  response.send("food-order/ Post huselt irlee");
};

export const getAllOrders = (request: Request, response: Response) => {
  response.send("food-order/ Get huselt irlee");
};

export const getOrdersByUserId = (request: Request, response: Response) => {
  response.send("food-order/:userId Get huselt irlee");
};

export const updateOrder = (request: Request, response: Response) => {
  response.send("food-order/:orderId Patch huselt irlee");
};
