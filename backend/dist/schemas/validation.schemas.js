"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validate = exports.mongoIdSchema = exports.updateOrderSchema = exports.createOrderSchema = exports.updateCategorySchema = exports.createCategorySchema = exports.updateFoodSchema = exports.createFoodSchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format").toLowerCase().trim(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    phoneNumber: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    role: zod_1.z.enum(["ADMIN", "USER"]).optional(),
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format").toLowerCase().trim(),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.createFoodSchema = zod_1.z.object({
    foodName: zod_1.z
        .string()
        .min(1, "Food name is required")
        .max(100, "Food name too long")
        .trim(),
    price: zod_1.z
        .number()
        .positive("Price must be greater than 0")
        .max(10000, "Price too high"),
    ingredients: zod_1.z.string().min(1, "Ingredients are required").trim(),
    image: zod_1.z.string().url("Invalid image URL"),
    category: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
});
exports.updateFoodSchema = zod_1.z.object({
    foodName: zod_1.z.string().min(1).max(100).trim().optional(),
    price: zod_1.z.number().positive().max(10000).optional(),
    ingredients: zod_1.z.string().min(1).trim().optional(),
    image: zod_1.z.string().url().optional(),
    category: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID")
        .optional(),
});
exports.createCategorySchema = zod_1.z.object({
    categoryName: zod_1.z
        .string()
        .min(1, "Category name is required")
        .max(50, "Category name too long")
        .trim(),
});
exports.updateCategorySchema = zod_1.z.object({
    categoryName: zod_1.z
        .string()
        .min(1, "Category name is required")
        .max(50, "Category name too long")
        .trim(),
});
exports.createOrderSchema = zod_1.z.object({
    foodOrderItems: zod_1.z
        .array(zod_1.z.object({
        food: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid food ID"),
        quantity: zod_1.z
            .number()
            .int()
            .min(1, "Quantity must be at least 1")
            .max(50, "Quantity too high"),
    }))
        .min(1, "At least one food item is required")
        .max(20, "Too many food items in one order"),
    totalPrice: zod_1.z
        .number()
        .positive("Total price must be greater than 0")
        .max(10000, "Total price too high"),
    deliveryAddress: zod_1.z
        .string()
        .min(1, "Delivery address is required")
        .trim()
        .max(500, "Address too long"),
    deliveryPhone: zod_1.z
        .string()
        .min(1, "Delivery phone is required")
        .trim()
        .max(20, "Phone number too long"),
});
exports.updateOrderSchema = zod_1.z.object({
    status: zod_1.z.enum(["PENDING", "CANCELED", "DELIVERED"]).optional(),
});
exports.mongoIdSchema = zod_1.z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: error.issues.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            next(error);
        }
    };
};
exports.validate = validate;
const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.params);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid parameters",
                    errors: error.issues.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            next(error);
        }
    };
};
exports.validateParams = validateParams;
//# sourceMappingURL=validation.schemas.js.map