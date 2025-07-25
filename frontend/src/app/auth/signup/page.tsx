"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../layout";
import authNavigation from "@/lib/authNavigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { signupSchema, SignupFormData } from "@/lib/schemas/auth";
import EmailStep from "@/components/auth/EmailStep";
import PasswordStep from "@/components/auth/PasswordStep";

const SignupPage = () => {
  const { handleNavigate } = authNavigation();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    if (step === 2) {
      setIsLoading(true);
      try {
        const result = await axios.post(
          "https://food-delivery-9lk5.onrender.com/api/auth/signup",
          { email: data.email, password: data.password }
        );

        if (result.status === 201) {
          login(result.data.user);
          localStorage.setItem("token", result.data.token);
          handleNavigate("/");
        } else {
          handleNavigate("/auth/signin");
        }
      } catch (error) {
        console.error("Signup error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthLayout>
      <div className="form-container">
        <Button
          variant="secondary"
          className="size-9 pointer text-obsidian border border-light-gray"
          onClick={() => step === 2 && setStep(1)}
        >
          <ChevronLeft />
        </Button>

        <div>
          <h3 className="heading">
            {step === 1 ? "Create your account" : "Create a strong password"}
          </h3>
          <p className="paragraph">
            {step === 1
              ? "Sign up to explore your favorite dishes."
              : "Create a strong password with letters, numbers."}
          </p>
        </div>

        {step === 1 ? (
          <EmailStep
            register={register}
            errors={errors}
            trigger={trigger}
            onNext={() => setStep(2)}
          />
        ) : (
          <PasswordStep
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        )}

        <div className="bottom-container">
          <p className="paragraph">Already have an account?</p>
          <Link href="/auth/signin" className="accent">
            Log in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
