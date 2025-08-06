import { Response, NextFunction } from "express";
import { Request } from "express";
import { AuthenticatedUser } from "../types/index.js";

interface AuthRequest extends Request {
  user: AuthenticatedUser;
}

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (authReq.user.role !== "ADMIN") {
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
