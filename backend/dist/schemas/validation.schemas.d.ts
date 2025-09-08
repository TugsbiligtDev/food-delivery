import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
export declare const signUpSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        USER: "USER";
    }>>;
}, z.core.$strip>;
export declare const signInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createFoodSchema: z.ZodObject<{
    foodName: z.ZodString;
    price: z.ZodNumber;
    ingredients: z.ZodString;
    image: z.ZodString;
    category: z.ZodString;
}, z.core.$strip>;
export declare const updateFoodSchema: z.ZodObject<{
    foodName: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    ingredients: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createCategorySchema: z.ZodObject<{
    categoryName: z.ZodString;
}, z.core.$strip>;
export declare const updateCategorySchema: z.ZodObject<{
    categoryName: z.ZodString;
}, z.core.$strip>;
export declare const createOrderSchema: z.ZodObject<{
    foodOrderItems: z.ZodArray<z.ZodObject<{
        food: z.ZodString;
        quantity: z.ZodNumber;
    }, z.core.$strip>>;
    totalPrice: z.ZodNumber;
    deliveryAddress: z.ZodString;
    deliveryPhone: z.ZodString;
}, z.core.$strip>;
export declare const updateOrderSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        CANCELED: "CANCELED";
        DELIVERED: "DELIVERED";
    }>>;
}, z.core.$strip>;
export declare const mongoIdSchema: z.ZodString;
export declare const validate: (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateParams: (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validation.schemas.d.ts.map