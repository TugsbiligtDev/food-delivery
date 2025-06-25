/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
export const refreshToken = async (request: Request, response: Response) => {
  response.send("auth/refresh Get huselt irlee");
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const comparedPassword = bcrypt.compare(password, user?.password || "");
    const token = jwt.sign({ userId: user?._id }, "tima1021", {
      expiresIn: "1h",
    });

    if (!comparedPassword) {
      res.status(200).json({
        success: false,
        message: " not Authenticated",
      });
    }
    res.status(200).json({
      success: true,
      message: "Authenticated",
      token: token,
    });
  } catch (error) {
    console.log(error);

    res.status(444).json({
      success: false,
      error: error,
    });
  }
};
export const signUp = async (req: Request, res: Response) => {
  const { email, password, phoneNumber, address } = req.body;
  try {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const hashedPassword = bcrypt.hash(password, salt);

    const createdUser = await User.create({
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      address: address,
    });
    res.status(200).json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    res.status(404).json({
      succes: false,
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
