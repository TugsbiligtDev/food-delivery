import express from "express";
import {
  getAuthRef,
  createSignIn,
  createSignUp,
  createPassReq,
  getVerifyResetPass,
  resPass,
} from "../controllers/authentication.controller.js";

const authRouter = express.Router();
authRouter.get("/auth/refresh", getAuthRef);
authRouter.post("/auth/sign-in", createSignIn);
authRouter.post("/auth/sign-up", createSignUp);
authRouter.post("/auth/reset-password-request", createPassReq);
authRouter.post("//auth/reset-password", resPass);
authRouter.get("/auth/verify-reset-password-request", getVerifyResetPass);

export default authRouter;
