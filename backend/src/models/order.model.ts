import mongoose from "mongoose";
import { User } from "./auth.model.js";
import { Food } from "./food.model.js";
const { Schema, model } = mongoose;

const order = new Schema({
  user: [
    {
      type: Schema.ObjectId,
      ref: User,
    },
  ], //objectId
  totalPrice: Number,
  foodOrderItems: [
    {
      type: Schema.ObjectId,
      ref: Food,
    },
  ],
  status: {
    type: String,
    enum: ["PENDING", "CANCELED", "DELIVERED"],
    default: "PENDING",
  },
  createedAt: Date,
  updatedAt: Date,
});
export const Order = model("Order", order);
