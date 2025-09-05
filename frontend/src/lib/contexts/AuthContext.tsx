"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  getUser,
  logout as authLogout,
  setUser as setUserStorage,
  setupAuthInterceptor,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up axios interceptors for authentication
    setupAuthInterceptor();

    // Initialize user state from localStorage
    const initializeAuth = () => {
      try {
        const storedUser = getUser();
        setUser(storedUser);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      authLogout();
      setUser(null);
      // Force a hard refresh to clear any cached state
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback: try to clear storage and redirect anyway
      localStorage.clear();
      window.location.href = "/";
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (newUser: User) => {
    setUserStorage(newUser);
    setUser(newUser);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
