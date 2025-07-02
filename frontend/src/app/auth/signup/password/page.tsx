"use client";
import AuthLayout from "../../AuthLayout";
import PasswordCreate from "@/components/auth/PasswordCreate";
import authNavigation from "@/lib/authNavigation";
const page = () => {
  const { handleNavigate } = authNavigation();
  return (
    <AuthLayout>
      <PasswordCreate
        prev={() => {
          handleNavigate("/auth/signup");
        }}
      />
    </AuthLayout>
  );
};

export default page;

//todo Make a Validation
//todo Choose one of error msg
//todo Show & Hide password
