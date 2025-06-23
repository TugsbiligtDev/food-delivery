import mongoose from "mongoose";
import { Food } from "./foods.model.js";
const { Schema, model } = mongoose;

const orderItem = new Schema({
  food: {
    type: Schema.ObjectId,
    ref: Food,
  },
  quantity: { type: Number, required: true },
});

export const OrderItem = model("OrderItem", orderItem);
