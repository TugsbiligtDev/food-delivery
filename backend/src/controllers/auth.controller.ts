import { Request, Response } from "express";
export const refreshToken = (request: Request, response: Response) => {
  response.send("auth/refresh Get huselt irlee");
};

export const signIn = (request: Request, response: Response) => {
  response.send("auth/sign-in Post huselt irlee");
};

export const signUp = (request: Request, response: Response) => {
  response.send("auth/sign-up Post huselt irlee");
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
