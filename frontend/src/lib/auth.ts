import axios from "axios";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "") + "/api";

export interface User {
  _id: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: "ADMIN" | "USER";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
  token: string;
}

export interface SignupData {
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  role?: "ADMIN" | "USER";
}

export interface SigninData {
  email: string;
  password: string;
}

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const getUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const setUser = (user: User): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const removeUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Signup failed";
    throw new Error(errorMessage);
  }
};

export const signin = async (data: SigninData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, data);
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Signin failed";
    throw new Error(errorMessage);
  }
};

export const logout = (): void => {
  try {
    removeToken();
    removeUser();
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
    }
  } catch {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
  }
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const isAdmin = (): boolean => {
  const user = getUser();
  return user?.role === "ADMIN";
};

export const setupAuthInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
        window.location.href = "/auth/signin";
      }
      return Promise.reject(error);
    }
  );
};
