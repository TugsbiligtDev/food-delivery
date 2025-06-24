import mongoose from "mongoose";
const { Schema, model } = mongoose;

const user = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please add a phone number"],
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const User = model("User", user);
