import { Request, Response } from "express";
import { User } from "../models/index.js";

interface AuthRequest extends Request {
  userId?: string;
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const { phoneNumber, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { phoneNumber, address },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
