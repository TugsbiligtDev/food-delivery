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
  const [current, setCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      try {
        const result = await axios.post(
          "https://food-delivery-9lk5.onrender.com/api/auth/signup",
          {
            email: data.email,
            password: data.password,
          }
        );
        console.log("Success:", result);
        handleNavigate("/auth/signin");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthLayout>
      {current === 1 && (
        <div className="form-container">
          {/* Back Button */}
          <Button variant="secondary" className="size-9 pointer">
            <ChevronLeft />
          </Button>

          {/* Title */}
          <div>
            <h3 className="heading">Create your account</h3>
            <p className="paragraph">
              Sign up to explore your favorite dishes.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStep1Submit();
            }}
          >
            <div>
              {/* Email input */}
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
            {/* Move to password page button */}
            <Button className="long-button" type="submit">
              Let's Go
            </Button>
          </form>
          {/* Navigate to Login */}
          <div className="bottom-container">
            <p className="paragraph">Already have an account?</p>
            <Link href="/auth/login" className="accent">
              Log in
            </Link>
          </div>
        </div>
      )}
      {/* Create password section */}
      {current === 2 && (
        <div className="form-container">
          {/* Back button */}
          <Button
            variant="secondary"
            className="size-9 pointer"
            onClick={() => setCurrent(1)}
          >
            <ChevronLeft />
          </Button>
          {/* Title */}
          <div>
            <h3 className="heading">Create a strong password</h3>
            <p className="paragraph">
              Create a strong password with letters, numbers.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              {/* First password input */}
              <Input
                placeholder="Password"
                type={show ? "text" : "password"}
                {...register("password")}
                className="text-black"
              />
              {errors.password && (
                <ValidationMsg message={errors.password.message || ""} />
              )}
            </div>

            <div className="mb-3">
              {/* Second password input */}
              <Input
                placeholder="Confirm"
                type={show ? "text" : "password"}
                {...register("confirm")}
                className="text-black"
              />
              {errors.confirm && (
                <ValidationMsg message={errors.confirm.message || ""} />
              )}
            </div>
            {/* Show & Hide password */}
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
            <Link href="/auth/login" className="accent">
              Log in
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default Page;
