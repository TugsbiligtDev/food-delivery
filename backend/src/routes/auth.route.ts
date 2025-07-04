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
authRoutes.post("/login", signIn);
authRoutes.post("/signup", signUp);
authRoutes.post("/login/forget-password", resetPasswordRequest);
authRoutes.get("/login/forget-password/verify", verifyResetPasswordRequest);
authRoutes.post("/login/forget-password/reset", resetPassword);

export default authRoutes;
