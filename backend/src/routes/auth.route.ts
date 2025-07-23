import express, { RequestHandler } from "express";
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

router.post("/signin", signIn as RequestHandler);
router.post("/signup", signUp as RequestHandler);
router.post("/reset-password-request", resetPasswordRequest as RequestHandler);
router.get("/verify-reset-token", verifyResetPasswordRequest as RequestHandler);
router.post("/reset-password", resetPassword as RequestHandler);

router.post(
  "/refresh",
  verifyToken as RequestHandler,
  refresh as RequestHandler
);

export default router;
