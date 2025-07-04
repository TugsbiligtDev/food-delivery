"use client";
import authNavigation from "@/lib/authNavigation";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import AuthLayout from "../AuthLayout";
import ValidationMsg from "@/components/auth/ValidationMsg";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email. Use a format like example@email.com."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type FormData = z.infer<typeof schema>;

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { handleNavigate } = authNavigation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    setIsLoading(true);
    setLoginError(null);

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", result);

      if (result.status === 200 && result.data) {
        // You might want to store the token or user data here
        // localStorage.setItem('token', result.data.token); // if you get a token
        handleNavigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle different types of errors
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setLoginError("Invalid email or password");
        } else if (error.response?.status === 400) {
          setLoginError("Please check your email and password");
        } else {
          setLoginError("Something went wrong. Please try again.");
        }
      } else {
        setLoginError("Network error. Please check your connection.");
      }
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
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {loginError}
            </div>
          )}

          <div className="mb-5">
            <Input
              placeholder="Enter your email address"
              type="email"
              {...register("email")}
              disabled={isLoading}
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
            />
            {errors.password && (
              <ValidationMsg message={errors.password.message || ""} />
            )}
          </div>

          <Link
            href="/auth/forget-password"
            className="font-normal text-sm leading-5 text-[#18181B] underline mb-2 block"
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
