import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { User } from "../models/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "Ultra_s3cr3t";
const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = "1h";
const RESET_TOKEN_EXPIRY = 60 * 60 * 1000;

//? Consider is this useful
const resetTokens = new Map<string, { email: string; expires: Date }>();
//? Consider is this helps
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const error = (res: Response, msg: string, code = 400) =>
  res.status(code).json({ success: false, message: msg });

const hashPassword = (password: string) => bcrypt.hash(password, SALT_ROUNDS);

const removePassword = (user: any) => {
  const { password, ...rest } = user.toObject();
  return rest;
};

const createToken = (userId: string) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return error(res, "Email and password required");

    const exists = await User.findOne({ email });
    if (exists) return error(res, "Email already in use", 409);

    const newUser = await User.create({
      email,
      password: await hashPassword(password),
    });
    res.status(201).json({
      success: true,
      message: "User created",
      user: removePassword(newUser),
    });
  } catch (err) {
    console.error("Sign up error:", err);
    error(res, "Internal server error", 500);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return error(res, "Email and password required");

    const user = await User.findOne({ email });
    const match = user && (await bcrypt.compare(password, user.password));
    if (!match) return error(res, "Invalid credentials", 401);

    res.json({
      success: true,
      message: "Signed in",
      token: createToken(user._id.toString()),
      user: removePassword(user),
    });
  } catch (err) {
    console.error("Sign in error:", err);
    error(res, "Internal server error", 500);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return error(res, "No token provided", 401);

    const { userId } = jwt.verify(token, JWT_SECRET) as any;
    const user = await User.findById(userId).select("-password");
    if (!user) return error(res, "User not found", 404);

    res.json({
      success: true,
      message: "Token refreshed",
      token: createToken(user._id.toString()),
      user,
    });
  } catch {
    error(res, "Invalid token", 401);
  }
};

export const resetPasswordRequest = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return error(res, "Email is required");

    const user = await User.findOne({ email });
    const message =
      "If an account exists, a reset link has been sent to your email";
    if (!user) return res.json({ success: true, message });

    const token = crypto.randomBytes(32).toString("hex");
    resetTokens.set(token, {
      email: user.email,
      expires: new Date(Date.now() + RESET_TOKEN_EXPIRY),
    });

    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${url}">Reset Password</a>
        <p>This link expires in 1 hour.</p>
      `,
    });

    res.json({ success: true, message });
  } catch (err) {
    console.error("Reset request error:", err);
    error(res, "Internal server error", 500);
  }
};
export const verifyResetPasswordRequest = (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) return error(res, "Token is required");

  const data = resetTokens.get(token as string);
  if (!data || new Date() > data.expires) {
    resetTokens.delete(token as string);
    return error(res, "Invalid or expired token");
  }

  res.json({ success: true, message: "Token valid", email: data.email });
};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return error(res, "Token and new password required");

    const data = resetTokens.get(token);
    if (!data || new Date() > data.expires) {
      resetTokens.delete(token);
      return error(res, "Invalid or expired token");
    }

    await User.findOneAndUpdate(
      { email: data.email },
      { password: await hashPassword(newPassword) }
    );
    resetTokens.delete(token);
    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    error(res, "Internal server error", 500);
  }
};
