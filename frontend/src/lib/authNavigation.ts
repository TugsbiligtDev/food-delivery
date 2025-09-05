"use client";
import { useRouter } from "next/navigation";

const useAuthNavigation = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return { handleNavigate };
};

export default useAuthNavigation;
