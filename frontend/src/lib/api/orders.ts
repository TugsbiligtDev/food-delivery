import axios from "axios";
import { Order, CreateOrderData, ApiResponse } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:7777/api";

export const createOrder = async (
  orderData: CreateOrderData
): Promise<Order> => {
  try {
    const response = await axios.post<ApiResponse<Order>>(
      `${API_BASE_URL}/orders`,
      orderData
    );
    return response.data.data!;
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to create order";
    throw new Error(errorMessage);
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get<ApiResponse<Order[]>>(
      `${API_BASE_URL}/orders`
    );
    return response.data.data || [];
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to fetch orders";
    throw new Error(errorMessage);
  }
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const response = await axios.get<ApiResponse<Order[]>>(
      `${API_BASE_URL}/orders/user/${userId}`
    );
    return response.data.data || [];
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to fetch user orders";
    throw new Error(errorMessage);
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: "PENDING" | "CANCELED" | "DELIVERED"
): Promise<Order> => {
  try {
    const response = await axios.patch<ApiResponse<Order>>(
      `${API_BASE_URL}/orders/${orderId}`,
      { status }
    );
    return response.data.data!;
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to update order";
    throw new Error(errorMessage);
  }
};
