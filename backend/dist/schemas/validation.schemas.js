import { z } from "zod";
export const signUpSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(["ADMIN", "USER"]).optional(),
});
export const signInSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
});
export const createFoodSchema = z.object({
    foodName: z
        .string()
        .min(1, "Food name is required")
        .max(100, "Food name too long"),
    price: z.number().positive("Price must be greater than 0"),
    ingredients: z.string().min(1, "Ingredients are required"),
    image: z.string().url("Invalid image URL"),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
});
export const updateFoodSchema = z.object({
    foodName: z.string().min(1).max(100).optional(),
    price: z.number().positive().optional(),
    ingredients: z.string().min(1).optional(),
    image: z.string().url().optional(),
    category: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
});
export const createCategorySchema = z.object({
    categoryName: z
        .string()
        .min(1, "Category name is required")
        .max(50, "Category name too long"),
});
export const createOrderSchema = z.object({
    foodOrderItems: z
        .array(z.object({
        food: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid food ID"),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
    }))
        .min(1, "At least one food item is required"),
    totalPrice: z.number().positive("Total price must be greater than 0"),
    deliveryAddress: z.string().min(1, "Delivery address is required"),
    deliveryPhone: z.string().min(1, "Delivery phone is required"),
});
export const updateOrderSchema = z.object({
    status: z.enum(["PENDING", "CANCELED", "DELIVERED"]).optional(),
});
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
