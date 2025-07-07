import express from "express";
import {
  signIn,
  signUp,
  refresh,
  resetPasswordRequest,
  verifyResetPasswordRequest,
  resetPassword,
} from "../controllers/auth.controller.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signIn as any);
router.post("/signup", signUp as any);
router.post("/reset-password-request", resetPasswordRequest as any);
router.get("/verify-reset-token", verifyResetPasswordRequest as any);
router.post("/reset-password", resetPassword as any);

router.post("/refresh", verifyToken as any, refresh as any);

export default router;
