"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../AuthLayout";
import authNavigation from "@/lib/authNavigation";
const page = () => {
  const { handleNavigate } = authNavigation();
  return (
    <AuthLayout>
      <div className="form-container">
        <Button
          variant="secondary"
          className="size-9 pointer"
          onClick={() => handleNavigate("/auth/login")}
        >
          <ChevronLeft />
        </Button>
        <div>
          <h3 className="heading">Reset your password </h3>
          <p className="paragraph">
            Enter your email to receive a password reset link.
          </p>
        </div>
        <Input placeholder="Enter your email address" type="text" />
        <Button
          className="long-button"
          onClick={() => handleNavigate("/auth/forget-password/verify")}
        >
          Send link
        </Button>
        <div className="bottom-container">
          <p className="paragraph">Don’t have an account?</p>
          <Link href="/auth/signup" className="accent">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default page;
