"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const users_model_js_1 = require("../models/users.model.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
}
const signUp = async (req, res) => {
    try {
        const { email, password, phoneNumber, address, role } = req.body;
        const existingUser = await users_model_js_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const newUser = await users_model_js_1.User.create({
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            role,
        });
        const userWithoutPassword = await users_model_js_1.User.findById(newUser._id).select("-password");
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, JWT_SECRET, {
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
exports.signUp = signUp;
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users_model_js_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        const userProfile = await users_model_js_1.User.findById(user._id).select("-password");
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
exports.signIn = signIn;
