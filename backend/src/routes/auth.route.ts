import express, { RequestHandler } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", signIn as RequestHandler);
router.post("/signup", signUp as RequestHandler);

export default router;
