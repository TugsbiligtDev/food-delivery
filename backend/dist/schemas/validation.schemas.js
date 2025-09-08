import { z } from "zod";
export const signUpSchema = z.object({
    email: z.string().email("Invalid email format").toLowerCase().trim(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(["ADMIN", "USER"]).optional(),
});
export const signInSchema = z.object({
    email: z.string().email("Invalid email format").toLowerCase().trim(),
    password: z.string().min(1, "Password is required"),
});
export const createFoodSchema = z.object({
    foodName: z
        .string()
        .min(1, "Food name is required")
        .max(100, "Food name too long")
        .trim(),
    price: z
        .number()
        .positive("Price must be greater than 0")
        .max(10000, "Price too high"),
    ingredients: z.string().min(1, "Ingredients are required").trim(),
    image: z.string().url("Invalid image URL"),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
});
export const updateFoodSchema = z.object({
    foodName: z.string().min(1).max(100).trim().optional(),
    price: z.number().positive().max(10000).optional(),
    ingredients: z.string().min(1).trim().optional(),
    image: z.string().url().optional(),
    category: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID")
        .optional(),
});
export const createCategorySchema = z.object({
    categoryName: z
        .string()
        .min(1, "Category name is required")
        .max(50, "Category name too long")
        .trim(),
});
export const updateCategorySchema = z.object({
    categoryName: z
        .string()
        .min(1, "Category name is required")
        .max(50, "Category name too long")
        .trim(),
});
export const createOrderSchema = z.object({
    foodOrderItems: z
        .array(z.object({
        food: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid food ID"),
        quantity: z
            .number()
            .int()
            .min(1, "Quantity must be at least 1")
            .max(50, "Quantity too high"),
    }))
        .min(1, "At least one food item is required")
        .max(20, "Too many food items in one order"),
    totalPrice: z
        .number()
        .positive("Total price must be greater than 0")
        .max(10000, "Total price too high"),
    deliveryAddress: z
        .string()
        .min(1, "Delivery address is required")
        .trim()
        .max(500, "Address too long"),
    deliveryPhone: z
        .string()
        .min(1, "Delivery phone is required")
        .trim()
        .max(20, "Phone number too long"),
});
export const updateOrderSchema = z.object({
    status: z.enum(["PENDING", "CANCELED", "DELIVERED"]).optional(),
});
export const mongoIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");
export const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof z.ZodError) {
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
export const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.params);
            next();
        }
        catch (error) {
            if (error instanceof z.ZodError) {
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
