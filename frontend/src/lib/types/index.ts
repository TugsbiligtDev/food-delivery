// Food and Order Types
export interface Food {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: {
    _id: string;
    categoryName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  food: Food;
  quantity: number;
}

export interface OrderItem {
  food: string; // Food ID
  quantity: number;
}

export interface CreateOrderData {
  foodOrderItems: OrderItem[];
  totalPrice: number;
  deliveryAddress: string;
  deliveryPhone: string;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    email: string;
    role: string;
  };
  foodOrderItems: Array<{
    food: Food;
    quantity: number;
  }>;
  totalPrice: number;
  deliveryAddress: string;
  deliveryPhone: string;
  status: "PENDING" | "CANCELED" | "DELIVERED";
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
