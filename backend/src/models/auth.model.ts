import mongoose from "mongoose";
const { Schema, model } = mongoose;

const user = new Schema({
  email: {
    type: String,
    required: [true, "Please add an email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  phoneNumber: String,
  address: String,
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  isVerified: Boolean,
  createedAt: Date,
  updatedAt: Date,
});
export const User = model("User", user);
