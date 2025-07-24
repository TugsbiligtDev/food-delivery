import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/index.js";

dotenv.config();

interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET!;
const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = "1h";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({
      success: true,
      message: "User created",
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    console.error("Sign up error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });

    const user = await User.findOne({ email });
    const match = user && (await bcrypt.compare(password, user.password));
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY,
    });
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      success: true,
      message: "Signed in",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Sign in error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    const { userId } = jwt.verify(token, JWT_SECRET) as unknown as JWTPayload;
    const user = await User.findById(userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const newToken = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY,
    });

    res.json({
      success: true,
      message: "Token refreshed",
      token: newToken,
      user,
    });
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
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

