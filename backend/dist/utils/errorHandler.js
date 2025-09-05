export class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
export const createErrorResponse = (message, statusCode = 500, code, details) => ({
    success: false,
    message,
    code,
    details,
    ...(process.env.NODE_ENV === "development" && { stack: new Error().stack }),
});
export const sendErrorResponse = (res, error, statusCode) => {
    const code = statusCode || error.statusCode || 500;
    const message = error.message || "Internal server error";
    res
        .status(code)
        .json(createErrorResponse(message, code, undefined, undefined));
};
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
export const globalErrorHandler = (error, req, res, next) => {
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
    if (error.name === "MongoError" && error.code === 11000) {
        return sendErrorResponse(res, new AppError("Duplicate field value", 400), 400);
    }
    // Default error
    sendErrorResponse(res, error, 500);
};
