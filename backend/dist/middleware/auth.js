import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user.toObject();
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
export default authMiddleware;
