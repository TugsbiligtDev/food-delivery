/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
export const refresh = async (request: Request, response: Response) => {
  response.send("auth/refresh Get huselt irlee");
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user?._id }, "Ultra_s3cr3t", {
      expiresIn: "15m",
    });

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token: token,
      user: {
        id: user?._id,
        email: user?.email,
        role: user?.role,
        isVerified: user?.isVerified,
      },
    });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, phoneNumber, address } = req.body;

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: createdUser._id,
        email: createdUser.email,
        role: createdUser.role,
        isVerified: createdUser.isVerified,
      },
    });
  } catch (error) {
    console.error("Sign up error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const resetPasswordRequest = (request: Request, response: Response) => {
  response.send("auth/reset-password-request Post huselt irlee");
};

export const verifyResetPasswordRequest = (
  request: Request,
  response: Response
) => {
  response.send("auth/verify-reset-password-request Get huselt irlee");
};

export const resetPassword = (request: Request, response: Response) => {
  response.send("auth/reset-password Post huselt irlee");
};

// const transporter = nodemailer.createTransporter({
//   host: process.env.SMTP_HOST || "smtp.gmail.com",
//   port: parseInt(process.env.SMTP_PORT || "587"),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });
// const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "Ultra_r3fr3sh_s3cr3t";
// const generateTokens = (userId: string) => {
//   const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
//   const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
//   return { accessToken, refreshToken };
// };
// export const refresh = async (request: Request, response: Response) => {
//   try {
//     const { refreshToken } = request.body;

//     if (!refreshToken) {
//       return response.status(401).json({
//         success: false,
//         message: "Refresh token is required",
//       });
//     }

//     // Verify refresh token
//     const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: string };

//     // Check if user still exists
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return response.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Generate new tokens
//     const tokens = generateTokens(user._id.toString());

//     response.status(200).json({
//       success: true,
//       message: "Tokens refreshed successfully",
//       accessToken: tokens.accessToken,
//       refreshToken: tokens.refreshToken,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//       },
//     });
//   } catch (error) {
//     console.error("Token refresh error:", error);
//     response.status(401).json({
//       success: false,
//       message: "Invalid refresh token",
//     });
//   }
// };
// export const resetPasswordRequest = async (request: Request, response: Response) => {
//   try {
//     const { email } = request.body;

//     if (!email) {
//       return response.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       // Don't reveal if user exists or not for security
//       return response.status(200).json({
//         success: true,
//         message: "If an account with that email exists, a reset link has been sent",
//       });
//     }

//     // Generate reset token
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

//     // Set token expiration (1 hour)
//     const resetTokenExpiry = new Date(Date.now() + 3600000);

//     // Save reset token to user
//     await User.findByIdAndUpdate(user._id, {
//       resetPasswordToken: resetTokenHash,
//       resetPasswordExpiry: resetTokenExpiry,
//     });

//     // Create reset URL
//     const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

//     // Send email
//     const mailOptions = {
//       from: process.env.SMTP_FROM || 'noreply@yourapp.com',
//       to: email,
//       subject: 'Password Reset Request',
//       html: `
//         <h2>Password Reset Request</h2>
//         <p>You requested a password reset. Click the link below to reset your password:</p>
//         <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
//         <p>This link will expire in 1 hour.</p>
//         <p>If you didn't request this, please ignore this email.</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     response.status(200).json({
//       success: true,
//       message: "If an account with that email exists, a reset link has been sent",
//     });
//   } catch (error) {
//     console.error("Reset password request error:", error);
//     response.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
// export const verifyResetPasswordRequest = async (
//   request: Request,
//   response: Response
// ) => {
//   try {
//     const { token } = request.query;

//     if (!token || typeof token !== 'string') {
//       return response.status(400).json({
//         success: false,
//         message: "Reset token is required",
//       });
//     }

//     // Hash the token to compare with stored hash
//     const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

//     // Find user with valid reset token
//     const user = await User.findOne({
//       resetPasswordToken: resetTokenHash,
//       resetPasswordExpiry: { $gt: new Date() },
//     });

//     if (!user) {
//       return response.status(400).json({
//         success: false,
//         message: "Invalid or expired reset token",
//       });
//     }

//     response.status(200).json({
//       success: true,
//       message: "Reset token is valid",
//       email: user.email, // Optional: return email for UI
//     });
//   } catch (error) {
//     console.error("Verify reset password token error:", error);
//     response.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
// export const resetPassword = async (request: Request, response: Response) => {
//   try {
//     const { token, newPassword } = request.body;

//     if (!token || !newPassword) {
//       return response.status(400).json({
//         success: false,
//         message: "Token and new password are required",
//       });
//     }

//     // Validate password strength (optional)
//     if (newPassword.length < 6) {
//       return response.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters long",
//       });
//     }

//     // Hash the token to compare with stored hash
//     const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

//     // Find user with valid reset token
//     const user = await User.findOne({
//       resetPasswordToken: resetTokenHash,
//       resetPasswordExpiry: { $gt: new Date() },
//     });

//     if (!user) {
//       return response.status(400).json({
//         success: false,
//         message: "Invalid or expired reset token",
//       });
//     }

//     // Hash new password
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//     // Update user password and clear reset token
//     await User.findByIdAndUpdate(user._id, {
//       password: hashedPassword,
//       resetPasswordToken: undefined,
//       resetPasswordExpiry: undefined,
//     });

//     response.status(200).json({
//       success: true,
//       message: "Password reset successfully",
//     });
//   } catch (error) {
//     console.error("Reset password error:", error);
//     response.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
