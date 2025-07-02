"use client";
import { useRouter } from "next/navigation";
const authNavigation = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return { handleNavigate };
};

export default authNavigation;
