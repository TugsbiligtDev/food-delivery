import axios from "axios";
import { Food, Category, ApiResponse } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:7777/api";

export const createFood = async (foodData: {
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
}): Promise<Food> => {
  try {
    const response = await axios.post<ApiResponse<Food>>(
      `${API_BASE_URL}/foods`,
      foodData
    );
    return response.data.data!;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create food");
  }
};

export const updateFood = async (
  foodId: string,
  foodData: Partial<{
    foodName: string;
    price: number;
    ingredients: string;
    image: string;
    category: string;
  }>
): Promise<Food> => {
  try {
    const response = await axios.patch<ApiResponse<Food>>(
      `${API_BASE_URL}/foods/${foodId}`,
      foodData
    );
    return response.data.data!;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update food");
  }
};

export const deleteFood = async (foodId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/foods/${foodId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete food");
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<ApiResponse<Category[]>>(
      `${API_BASE_URL}/categories`
    );
    return response.data.data!;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};

export const createCategory = async (categoryData: {
  categoryName: string;
}): Promise<Category> => {
  try {
    const response = await axios.post<ApiResponse<Category>>(
      `${API_BASE_URL}/categories`,
      categoryData
    );
    return response.data.data!;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create category"
    );
  }
};

export const updateCategory = async (
  categoryId: string,
  categoryData: {
    categoryName: string;
  }
): Promise<Category> => {
  try {
    const response = await axios.patch<ApiResponse<Category>>(
      `${API_BASE_URL}/categories/${categoryId}`,
      categoryData
    );
    return response.data.data!;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update category"
    );
  }
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete category"
    );
  }
};
