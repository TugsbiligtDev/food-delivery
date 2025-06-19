import { Request, Response } from "express";
import { Auth } from "../models/index.js";
export const refreshToken = async (request: Request, response: Response) => {
  response.send("auth/refresh Get huselt irlee");
};

export const signIn = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const user = await Auth.find({ email, password });

    if (!user) {
      return response.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const signUp = async (request: Request, response: Response) => {
  try {
    const user = request.body;
    const createdUser = await Auth.create(user);
    response.json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
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
