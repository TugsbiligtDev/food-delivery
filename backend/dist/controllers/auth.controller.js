import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
}
export const signUp = async (req, res) => {
    try {
        const { email, password, phoneNumber, address, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            role,
        });
        const userWithoutPassword = await User.findById(newUser._id).select("-password");
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userWithoutPassword,
            token: token,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        const userProfile = await User.findById(user._id).select("-password");
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: userProfile,
            token: token,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error signing in user",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
