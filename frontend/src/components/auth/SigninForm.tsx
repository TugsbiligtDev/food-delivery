import React from "react";
import { Input } from "../ui/input";
import ValidationMsg from "./ValidationMsg";
import Link from "next/link";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { signinSchema, SigninFormData } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

interface SigninFormProps {
  onSubmit: (data: SigninFormData) => Promise<void>;
  isLoading: boolean;
}
const SigninForm = ({ onSubmit, isLoading }: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  return (
    <div>
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
          className="block mb-2 text-sm font-normal leading-5 underline text-black-20"
        >
          Forgot password ?
        </Link>

        <Button className="long-button" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Let's Go"}
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
