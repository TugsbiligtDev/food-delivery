"use client";
import AuthLayout from "../../AuthLayout";
import PasswordCreate from "@/components/auth/PasswordCreate";
import authNavigation from "@/lib/authNavigation";
const Page = () => {
  const { handleNavigate } = authNavigation();
  return (
    <AuthLayout>
      <PasswordCreate prev={() => handleNavigate("auth/login")} />
    </AuthLayout>
  );
};

export default Page;

//* Send this pages link through User's gmail account
