"use client";
import authNavigation from "@/lib/authNavigation";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import AuthLayout from "../AuthLayout";
import ValidationMsg from "@/components/auth/ValidationMsg";
import { useAuth } from "@/app/contexts/AuthContext";
import { signinSchema, SigninFormData } from "@/lib/schemas/auth";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleNavigate } = authNavigation();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    setIsLoading(true);

    try {
      const result = await axios.post(
        "https://food-delivery-9lk5.onrender.com/api/auth/signin",
        {
          email: data.email,
          password: data.password,
        }
      );

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

  return (
    <AuthLayout>
      <div className="form-container">
        <Button variant="secondary" className="size-9 pointer">
          <ChevronLeft />
        </Button>

        <div>
          <h3 className="heading">Log in</h3>
          <p className="paragraph">Log in to enjoy your favorite dishes.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <Input
              placeholder="Enter your email address"
              type="email"
              {...register("email")}
              disabled={isLoading}
              className="text-black"
            />
            {errors.email && (
              <ValidationMsg message={errors.email.message || ""} />
            )}
          </div>

          <div className="mb-3">
            <Input
              placeholder="Enter your password"
              type="password"
              {...register("password")}
              disabled={isLoading}
              className="text-black"
            />
            {errors.password && (
              <ValidationMsg message={errors.password.message || ""} />
            )}
          </div>

          <Link
            href="/auth/forget-password"
            className="block mb-2 text-sm font-normal underline leading-5 text-black-20"
          >
            Forgot password ?
          </Link>

          <Button className="long-button" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Let's Go"}
          </Button>
        </form>

        <div className="bottom-container">
          <p className="paragraph">Don't have an account?</p>
          <Link href="/auth/signup" className="accent">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Page;
