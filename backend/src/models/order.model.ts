import mongoose from "mongoose";
const { Schema, model } = mongoose;

const order = new Schema({
  user: String, //objectId
  totalPrice: Number,
  foodOrderItems: String, //foodOrderItem[]
  status: String, //FoodOrderStatusEnum
  createedAt: Date,
  updatedAt: Date,
});
export const Order = model("Order", order);
