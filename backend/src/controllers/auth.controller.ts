import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export const refreshToken = async (request: Request, response: Response) => {
  response.send("auth/refresh Get huselt irlee");
};

export const signIn = async (request: Request, response: Response) => {
  try {
    const { name, password } = request.body;
    const user = await User.findOne({ name });

    bcrypt.compare(password, user.password, (error, result) => {
      if (result) {
        response.status(200).json({
          success: true,
          message: "Authenticated",
        });
      } else {
        response.status(200).json({
          success: false,
          message: "not authenticated",
        });
      }
    });

    response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error,
    });
  }
};

// export const signUp = async (request: Request, response: Response) => {
//   const { name, password } = request.body;

//   try {
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);

//     const hashedPassword = await bcrypt.hash(password, salt);

//     const createdUser = await User.create({
//       name,
//       password: hashedPassword,
//     });

//     response.status(200).json({
//       success: true,
//       data: createdUser,
//     });
//   } catch (error) {
//     response.status(400).json({
//       success: false,
//       error: error,
//     });
//   }
// };

export const signUp = async (request: Request, response: Response) => {
  const { email, password, address, phoneNumber } = request.body;

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await User.create({
        email: email,
        password: hash,
        phoneNumber: phoneNumber,
        address: address,
      });

      response.status(200).json({
        success: true,
        data: createdUser,
      });
    });
  } catch (error) {
    response.status(444).json({
      success: false,
      error: error,
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
