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
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"],
      trim: true,
    },
    deliveryPhone: {
      type: String,
      required: [true, "Delivery phone is required"],
      trim: true,
    },
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

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

export const Order = model("Order", orderSchema);
