/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export const refreshToken = async (request: Request, response: Response) => {
  response.send("auth/refresh Get huselt irlee");
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign({ userId: user?._id }, JWT_SECRET as string, {
      expiresIn: "15m",
    });

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      accessToken,
      user: {
        id: user?._id,
        email: user?.email,
        role: user?.role,
        isVerified: user?.isVerified,
      },
    });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, phoneNumber, address } = req.body;

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: createdUser._id,
        email: createdUser.email,
        role: createdUser.role,
        isVerified: createdUser.isVerified,
      },
    });
  } catch (error) {
    console.error("Sign up error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPasswordRequest = (request: Request, response: Response) => {
  response.send("auth/reset-password-request Post huselt irlee");
};

export const verifyResetPasswordRequest = (
  request: Request,
  response: Response
) => {
  response.send("auth/verify-reset-password-request Get huselt irlee");
};

export const resetPassword = (request: Request, response: Response) => {
  response.send("auth/reset-password Post huselt irlee");
};
