import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET || "Ultra_s3cr3t";

const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.header("Authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : auth;

  if (!token)
    return res.status(401).json({ success: false, message: "Token required" });

  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(userId).select("-password");

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    req.userId = userId;
    req.user = user;
    next();
  } catch (err: any) {
    if (err instanceof jwt.TokenExpiredError)
      return res.status(401).json({ success: false, message: "Token expired" });

    if (err instanceof jwt.JsonWebTokenError)
      return res.status(401).json({ success: false, message: "Invalid token" });

    return res.status(500).json({ success: false, message: "Auth failed" });
  }
};

export default verifyToken;
