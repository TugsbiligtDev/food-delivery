import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price must be greater than 0"],
    },
    foodOrderItems: [
      {
        food: {
          type: Types.ObjectId,
          ref: "Food",
          required: [true, "Food is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["PENDING", "CANCELED", "DELIVERED"],
        message: "Status must be PENDING, CANCELED, or DELIVERED",
      },
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
