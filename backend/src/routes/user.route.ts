import express from "express";
import verifyToken from "../middleware/auth.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/profile", verifyToken as any, updateProfile);

export default router;
