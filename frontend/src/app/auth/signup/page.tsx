"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ValidationMsg from "@/components/auth/ValidationMsg";
import AuthLayout from "../AuthLayout";
import authNavigation from "@/lib/authNavigation";
import { useAuth } from "@/app/contexts/AuthContext";

const schema = z
  .object({
    email: z
      .string()
      .email("Invalid email. Use a format like example@email.com"),
    password: z
      .string()
      .min(6, "Password too short")
      .regex(/[0-9]/, "Add a number")
      .regex(/[^A-Za-z0-9]/, "Add a symbol"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type FormData = z.infer<typeof schema>;

const Page = () => {
  const { handleNavigate } = authNavigation();
  const { login } = useAuth(); // Add this line
  const [current, setCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null); // Add error state

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleStep1Submit = async () => {
    const isEmailValid = await trigger("email");
    if (isEmailValid) {
      setCurrent(2);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (current === 2) {
      setIsLoading(true);
      setSignupError(null);

      try {
        const result = await axios.post(
          "https://food-delivery-9lk5.onrender.com/api/auth/signup",
          {
            email: data.email,
            password: data.password,
          }
        );

        console.log("Signup successful:", result);

        if (result.status === 200 || result.status === 201) {
          // 🔥 AUTO-LOGIN AFTER SUCCESSFUL SIGNUP
          const userData = {
            id: result.data.id || result.data.user?.id || "new-user",
            name: result.data.name || result.data.user?.name || "User",
            email: result.data.email || data.email,
          };

          // Update auth context - user is now logged in
          login(userData);

          // Optional: Save token if provided
          if (result.data.token) {
            localStorage.setItem("token", result.data.token);
          }

          console.log("🎉 User auto-logged in after signup");

          // Redirect to home instead of signin
          handleNavigate("/");
        } else {
          // If signup succeeded but no auto-login, redirect to signin
          handleNavigate("/auth/signin");
        }
      } catch (error) {
        console.error("Signup error:", error);

        // Better error handling
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            setSignupError("An account with this email already exists");
          } else if (error.response?.status === 400) {
            setSignupError("Please check your information and try again");
          } else {
            setSignupError("Something went wrong. Please try again.");
          }
        } else {
          setSignupError("Network error. Please check your connection.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthLayout>
      {current === 1 && (
        <div className="form-container">
          <Button variant="secondary" className="size-9 pointer">
            <ChevronLeft />
          </Button>

          <div>
            <h3 className="heading">Create your account</h3>
            <p className="paragraph">
              Sign up to explore your favorite dishes.
            </p>
          </div>

          {/* Show error if exists */}
          {signupError && (
            <div className="p-3 mb-4 text-sm text-red-700 border border-red-200 rounded bg-red-50">
              {signupError}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStep1Submit();
            }}
          >
            <div>
              <Input
                placeholder="Enter your email address"
                type="email"
                {...register("email")}
                className="text-black"
              />
              {errors.email && (
                <ValidationMsg message={errors.email.message || ""} />
              )}
            </div>
            <Button className="long-button" type="submit">
              Let's Go
            </Button>
          </form>
          <div className="bottom-container">
            <p className="paragraph">Already have an account?</p>
            <Link href="/auth/signin" className="accent">
              {/* Fixed link path */}
              Log in
            </Link>
          </div>
        </div>
      )}
      {current === 2 && (
        <div className="form-container">
          <Button
            variant="secondary"
            className="size-9 pointer"
            onClick={() => setCurrent(1)}
          >
            <ChevronLeft />
          </Button>
          <div>
            <h3 className="heading">Create a strong password</h3>
            <p className="paragraph">
              Create a strong password with letters, numbers.
            </p>
          </div>

          {/* Show error in step 2 as well */}
          {signupError && (
            <div className="p-3 mb-4 text-sm text-red-700 border border-red-200 rounded bg-red-50">
              {signupError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Input
                placeholder="Password"
                type={show ? "text" : "password"}
                {...register("password")}
                className="text-black"
                disabled={isLoading}
              />
              {errors.password && (
                <ValidationMsg message={errors.password.message || ""} />
              )}
            </div>

            <div className="mb-3">
              <Input
                placeholder="Confirm"
                type={show ? "text" : "password"}
                {...register("confirm")}
                className="text-black"
                disabled={isLoading}
              />
              {errors.confirm && (
                <ValidationMsg message={errors.confirm.message || ""} />
              )}
            </div>
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={() => setShow(!show)}
            >
              <Checkbox />
              <Label className="font-normal text-sm leading-3.5 text-[#71717A] cursor-pointer">
                Show password
              </Label>
            </div>

            <Button className="long-button" type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Let's Go"}
            </Button>
          </form>

          <div className="bottom-container">
            <p className="paragraph">Already have an account?</p>
            <Link href="/auth/signin" className="accent">
              {/* Fixed link path */}
              Log in
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default Page;
