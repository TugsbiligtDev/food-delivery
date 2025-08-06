import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { validate, signInSchema, signUpSchema } from "../schemas/validation.js";

const router = express.Router();

router.post("/signin", validate(signInSchema), signIn);
router.post("/signup", validate(signUpSchema), signUp);

export default router;
