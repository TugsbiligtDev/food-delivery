import express from "express";
import {
  refresh,
  signIn,
  signUp,
  resetPasswordRequest,
  verifyResetPasswordRequest,
  resetPassword,
} from "../controllers/auth.controller.js";
import verifyToken from "../middleware/auth.js";

const authRoutes = express.Router();

authRoutes.get("/refresh", verifyToken as any, refresh);
authRoutes.post("/sign-in", signIn);
authRoutes.post("/sign-up", signUp);
authRoutes.post("/reset-password-request", resetPasswordRequest);
authRoutes.get("/verify-reset-password-request", verifyResetPasswordRequest);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
