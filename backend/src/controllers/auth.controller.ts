import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || "Ultra_s3cr3t";
const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = "1h";

const error = (res: Response, msg: string, code = 400) =>
  res.status(code).json({ success: false, message: msg });

const hashPassword = (password: string) => bcrypt.hash(password, SALT_ROUNDS);

const removePassword = (user: any) => {
  const { password, ...rest } = user.toObject();
  return rest;
};

const createToken = (userId: string) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return error(res, "Email and password required");

    const exists = await User.findOne({ email });
    if (exists) return error(res, "Email already in use", 409);

    const newUser = await User.create({
      email,
      password: await hashPassword(password),
    });
    res.status(201).json({
      success: true,
      message: "User created",
      user: removePassword(newUser),
    });
  } catch (err) {
    console.error("Sign up error:", err);
    error(res, "Internal server error", 500);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return error(res, "Email and password required");

    const user = await User.findOne({ email });
    const match = user && (await bcrypt.compare(password, user.password));
    if (!match) return error(res, "Invalid credentials", 401);

    res.json({
      success: true,
      message: "Signed in",
      token: createToken(user._id.toString()),
      user: removePassword(user),
    });
  } catch (err) {
    console.error("Sign in error:", err);
    error(res, "Internal server error", 500);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return error(res, "No token provided", 401);

    const { userId } = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const user = await User.findById(userId).select("-password");
    if (!user) return error(res, "User not found", 404);

    res.json({
      success: true,
      message: "Token refreshed",
      token: createToken(user._id.toString()),
      user,
    });
  } catch {
    error(res, "Invalid token", 401);
  }
};

export const resetPasswordRequest = (req: Request, res: Response) => {
  res.json({ success: true, message: "Password reset request successful" });
};
export const verifyResetPasswordRequest = (req: Request, res: Response) => {
  res.json({ success: true, message: "Password reset successful" });
};
export const resetPassword = (req: Request, res: Response) => {
  res.json({ success: true, message: "Token valid" });
};

//! Line 21,22
