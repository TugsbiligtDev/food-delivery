import axios from "axios";
import { Food, Category, ApiResponse } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const getAllFoods = async (): Promise<Food[]> => {
  try {
    const response = await axios.get<ApiResponse<Food[]>>(
      `${API_BASE_URL}/foods`
    );
    return response.data.data || [];
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to fetch foods";
    throw new Error(errorMessage);
  }
};

export const getFoodById = async (foodId: string): Promise<Food> => {
  try {
    const response = await axios.get<ApiResponse<Food>>(
      `${API_BASE_URL}/foods/${foodId}`
    );
    return response.data.data!;
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to fetch food";
    throw new Error(errorMessage);
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<ApiResponse<Category[]>>(
      `${API_BASE_URL}/categories`
    );
    return response.data.data || [];
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to fetch categories";
    throw new Error(errorMessage);
  }
};
