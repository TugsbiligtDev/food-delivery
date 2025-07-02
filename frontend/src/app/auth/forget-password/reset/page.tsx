"use client";
import AuthLayout from "../../AuthLayout";
import PasswordCreate from "@/components/auth/PasswordCreate";
import { useRouter } from "next/navigation";
import authNavigation from "@/lib/authNavigation";
const page = () => {
  const { handleNavigate } = authNavigation();
  return (
    <AuthLayout>
      <PasswordCreate prev={() => handleNavigate("auth/login")} />
    </AuthLayout>
  );
};

export default page;

//* Send this pages link through User's gmail account
