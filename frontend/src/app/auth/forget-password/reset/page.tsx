"use client";

import PasswordStep from "@/components/auth/PasswordStep";
import useAuthNavigation from "@/lib/authNavigation";

const Page = () => {
  const { handleNavigate } = useAuthNavigation();
  return <PasswordStep prev={() => handleNavigate("auth/login")} />;
};

export default Page;

//* Send this pages link through User's gmail account
