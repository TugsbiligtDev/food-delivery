import { Request, Response } from "express";

export const createOrder = async (request: Request, response: Response) => {
  response.send("POST request");
};

export const getAllOrders = async (request: Request, response: Response) => {
  response.send("GET request");
};

export const getOrdersByUserId = async (
  request: Request,
  response: Response
) => {
  response.send("GET request");
};

export const updateOrder = async (request: Request, response: Response) => {
  response.send("PATCH request");
};
