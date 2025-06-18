import mongoose from "mongoose";
const { Schema, model } = mongoose;

const auth = new Schema({
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
  role: String, //UserRoleEnum
  isVerified: Boolean,
  createedAt: Date,
  updatedAt: Date,
});
export const Auth = model("Auth", auth);
