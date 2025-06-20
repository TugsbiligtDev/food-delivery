import mongoose from "mongoose";
const { Schema, model } = mongoose;

const food = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});
export const Food = model("Food", food);
