import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.js";

const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authorization error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export default adminMiddleware;
