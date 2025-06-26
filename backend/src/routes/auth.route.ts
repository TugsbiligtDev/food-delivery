import express from "express";
import {
  refreshToken,
  signIn,
  signUp,
  resetPasswordRequest,
  verifyResetPasswordRequest,
  resetPassword,
} from "../controllers/auth.controller.js";

import authenticateToken from "../middleware/auth.js";

const authRoutes = express.Router();

authRoutes.get("/refresh", refreshToken);
authRoutes.post("/sign-in/", authenticateToken, signIn);
authRoutes.post("/sign-up", signUp);
authRoutes.post("/reset-password-request", resetPasswordRequest);
authRoutes.get("/verify-reset-password-request", verifyResetPasswordRequest);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
