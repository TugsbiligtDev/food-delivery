"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, isAdmin } from "@/lib/auth";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const user = getUser();

      if (!user) {
        router.push("/auth/signin");
        return;
      }

      if (!isAdmin()) {
        router.push("/");
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Checking admin access...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default AdminGuard;
