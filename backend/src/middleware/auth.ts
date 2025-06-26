import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "Ultra_s3cr3t";

const verifyToken = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const token = request.header("Authorization");

  if (!token) {
    return response.status(401).json({
      success: false,
      message: "Access token required",
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    request.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  }
};
export default verifyToken;
