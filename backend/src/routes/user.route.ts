import express, { RequestHandler } from "express";
import verifyToken from "../middleware/auth.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.patch(
  "/profile",
  verifyToken as RequestHandler,
  updateProfile as RequestHandler
);

export default router;
