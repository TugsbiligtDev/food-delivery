"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import ValidationMsg from "./ValidationMsg";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { signupSchema, type SignupFormData } from "@/lib/schemas/auth";
import { signup, setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

interface PasswordStepProps {
  email: string;
}

const PasswordStep = ({ email }: PasswordStepProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await signup({
        email: data.email,
        password: data.password,
        role: "USER", // Default role for signup
      });

      if (response.success) {
        setToken(response.token);
        updateUser(response.data);
        router.push("/"); // Redirect to home page
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Input
            {...register("password")}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="text-black"
            disabled={isLoading}
          />
          <ValidationMsg message={errors.password?.message || ""} />
        </div>

        <div className="mb-3">
          <Input
            {...register("confirm")}
            placeholder="Confirm password"
            type={showPassword ? "text" : "password"}
            className="text-black"
            disabled={isLoading}
          />
          <ValidationMsg message={errors.confirm?.message || ""} />
        </div>

        <div className="flex items-center gap-2 cursor-pointer mb-5">
          <Checkbox
            id="show-password"
            checked={showPassword}
            onCheckedChange={(checked) => setShowPassword(checked as boolean)}
          />
          <Label
            htmlFor="show-password"
            className="font-normal text-sm leading-3.5 text-[#71717A] cursor-pointer"
          >
            Show password
          </Label>
        </div>

        <ValidationMsg message={error} />

        <Button className="long-button" type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordStep;
