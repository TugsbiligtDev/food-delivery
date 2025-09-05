import axios from "axios";
import { Food, Category, ApiResponse } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:7777/api";

export const getAllFoods = async (): Promise<Food[]> => {
  try {
    const response = await axios.get<ApiResponse<Food[]>>(
      `${API_BASE_URL}/foods`
    );
    return response.data.data || [];
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch foods");
  }
};

export const getFoodById = async (foodId: string): Promise<Food> => {
  try {
    const response = await axios.get<ApiResponse<Food>>(
      `${API_BASE_URL}/foods/${foodId}`
    );
    return response.data.data!;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch food");
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<ApiResponse<Category[]>>(
      `${API_BASE_URL}/categories`
    );
    return response.data.data || [];
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};
