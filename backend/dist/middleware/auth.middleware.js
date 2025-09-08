import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "JWT secret not configured",
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. User not found.",
            });
        }
        req.user = {
            _id: user._id.toString(),
            email: user.email,
            phoneNumber: user.phoneNumber || undefined,
            address: user.address || undefined,
            role: user.role,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
export default authMiddleware;
