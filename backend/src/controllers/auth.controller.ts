import { Request, Response } from "express";

export const signUp = async (req: Request, res: Response) => {
  // TODO: Implement signup logic
  res.status(200).json({
    success: true,
    message: "Signup endpoint - logic to be implemented",
  });
};

export const signIn = async (req: Request, res: Response) => {
  // TODO: Implement signin logic
  res.status(200).json({
    success: true,
    message: "Signin endpoint - logic to be implemented",
  });
};
