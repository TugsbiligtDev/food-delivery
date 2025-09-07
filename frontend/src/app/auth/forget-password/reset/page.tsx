"use client";

import PasswordStep from "@/components/auth/PasswordStep";
import useAuthNavigation from "@/lib/authNavigation";

const Page = () => {
  const { handleNavigate } = useAuthNavigation();
  return <PasswordStep email="" onBack={() => handleNavigate("auth/login")} />;
};

export default Page;
