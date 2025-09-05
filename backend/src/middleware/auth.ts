import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/index.js";

interface JWTPayload {
  userId: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: {
    _id: mongoose.Types.ObjectId;
    email: string;
    role: "ADMIN" | "USER";
    phoneNumber?: string | null;
    address?: string | null;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user.toObject();
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
