export interface AuthenticatedUser {
    _id: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    role: "ADMIN" | "USER";
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateUserData {
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    role?: "ADMIN" | "USER";
}
export interface SignInData {
    email: string;
    password: string;
}
export interface CreateFoodData {
    foodName: string;
    price: number;
    ingredients: string;
    image: string;
    category: string;
}
export interface UpdateFoodData {
    foodName?: string;
    price?: number;
    ingredients?: string;
    image?: string;
    category?: string;
}
export interface CreateOrderData {
    foodOrderItems: Array<{
        food: string;
        quantity: number;
    }>;
    totalPrice: number;
    deliveryAddress: string;
    deliveryPhone: string;
}
export interface CreateCategoryData {
    categoryName: string;
}
export type OrderStatus = "PENDING" | "CANCELED" | "DELIVERED";
export type UserRole = "ADMIN" | "USER";
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}
//# sourceMappingURL=index.d.ts.map