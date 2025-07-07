import mongoose from "mongoose";
const { Schema, model } = mongoose;
const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
