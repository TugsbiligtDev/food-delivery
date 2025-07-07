import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const foodSchema = new Schema(
  {
    foodName: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

export const Food = model("Food", foodSchema);
