"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import ValidationMsg from "./ValidationMsg";
import Link from "next/link";
import { Button } from "../ui/button";
import { signinSchema, type SigninFormData } from "@/lib/schemas/auth";
import { signin, setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await signin(data);

      if (response.success) {
        setToken(response.token);
        updateUser(response.data);

        if (response.data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signin failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Input
            {...register("email")}
            placeholder="Enter your email address"
            type="email"
            className="text-black"
            disabled={isLoading}
          />
          <ValidationMsg message={errors.email?.message || ""} />
        </div>

        <div className="mb-3">
          <Input
            {...register("password")}
            placeholder="Enter your password"
            type="password"
            className="text-black"
            disabled={isLoading}
          />
          <ValidationMsg message={errors.password?.message || ""} />
        </div>

        <ValidationMsg message={error} />

        <Link
          href="/auth/forget-password"
          className="block mb-2 text-sm font-normal leading-5 underline text-black-20"
        >
          Forgot password ?
        </Link>

        <Button className="long-button" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Let's Go"}
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
