import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const JWT_SECRET = "secret";
const JWT_EXPIRES_IN = "24h";

export const refreshToken = async (request: Request, response: Response) => {
  response.send("auth/refresh Get huselt irlee");
};

export const signIn = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!email || !password) {
      response.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      response.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    response.status(200).json({
      success: true,
      message: "Authentication successful",
      token: token,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const signUp = async (request: Request, response: Response) => {
  try {
    const { email, password, address, phoneNumber } = request.body;

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    response.status(201).json({
      success: true,
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
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
