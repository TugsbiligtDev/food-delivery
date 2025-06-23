import mongoose from "mongoose";
const { Schema, model } = mongoose;

const category = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required"],
    },
  },
  {
    timestamps: true,
  }
);
export const Category = model("Category", category);
