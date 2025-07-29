"use client";
import authNavigation from "@/lib/authNavigation";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import SigninForm from "@/components/auth/SigninForm";
import { SigninFormData } from "@/lib/schemas/auth";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleNavigate } = authNavigation();
  const { login } = useAuth();

  const handleSubmit = async (data: SigninFormData) => {
    setIsLoading(true);

    try {
      const result = await axios.post("http://localhost:8000/auth/signin", {
        email: data.email,
        password: data.password,
      });

      if (result.status === 200) {
        login(result.data.user);

        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
        }

        handleNavigate("/");
      }
    } catch (error) {
      console.error("Signin error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    handleNavigate("/");
  };

  return (
    <div className="form-container">
      <Button
        onClick={handleBack}
        variant="outline"
        className="size-9 pointer text-obsidian"
      >
        <ChevronLeft />
      </Button>

      <div>
        <h3 className="heading">Log in</h3>
        <p className="paragraph">Log in to enjoy your favorite dishes.</p>
      </div>

      <SigninForm onSubmit={handleSubmit} isLoading={isLoading} />

      <div className="bottom-container">
        <p className="paragraph">Don't have an account?</p>
        <Link href="/auth/signup" className="accent">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Page;
