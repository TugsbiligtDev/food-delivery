import mongoose from "mongoose";
import { UserRole } from "./enums/foodOrderStatus.js";
const { Schema, model } = mongoose;

const auth = new Schema({
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
  role: UserRole,
  isVerified: Boolean,
  createedAt: Date,
  updatedAt: Date,
});
export const Auth = model("Auth", auth);
