import mongoose from "mongoose";
import { FoodOrderStatus } from "./enums/userRole.js";
const { Schema, model } = mongoose;

const order = new Schema({
  user: String, //objectId
  totalPrice: Number,
  foodOrderItems: String, //foodOrderItem[]
  status: FoodOrderStatus, //FoodOrderStatusEnum
  createedAt: Date,
  updatedAt: Date,
});
export const Order = model("Order", order);
