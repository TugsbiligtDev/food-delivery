import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export interface ErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: any;
  stack?: string;
}

export class AppError extends Error implements ApiError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const createErrorResponse = (
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: any
): ErrorResponse => ({
  success: false,
  message,
  code,
  details,
  ...(process.env.NODE_ENV === "development" && { stack: new Error().stack }),
});

export const sendErrorResponse = (
  res: Response,
  error: ApiError | Error,
  statusCode?: number
) => {
  const code = statusCode || (error as ApiError).statusCode || 500;
  const message = error.message || "Internal server error";

  res
    .status(code)
    .json(createErrorResponse(message, code, undefined, undefined));
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const globalErrorHandler = (
  error: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Global error handler:", error);

  if (error instanceof AppError) {
    return sendErrorResponse(res, error, error.statusCode);
  }

  // Handle specific error types
  if (error.name === "ValidationError") {
    return sendErrorResponse(res, new AppError("Validation failed", 400), 400);
  }

  if (error.name === "CastError") {
    return sendErrorResponse(res, new AppError("Invalid ID format", 400), 400);
  }

  if (error.name === "MongoError" && (error as any).code === 11000) {
    return sendErrorResponse(
      res,
      new AppError("Duplicate field value", 400),
      400
    );
  }

  // Default error
  sendErrorResponse(res, error, 500);
};
