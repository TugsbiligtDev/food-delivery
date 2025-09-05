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
    setupAuthInterceptor();

    const initializeAuth = () => {
      try {
        const storedUser = getUser();
        setUser(storedUser);
      } catch {
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
      window.location.href = "/";
    } catch {
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
