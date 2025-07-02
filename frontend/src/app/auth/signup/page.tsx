"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ValidationMsg from "@/components/auth/ValidationMsg";
import AuthLayout from "../AuthLayout";
import authNavigation from "@/lib/authNavigation";

const schema = z.object({
  email: z.string().email("Invalid email. Use a format like example@email.com"),
});

type FormData = z.infer<typeof schema>;

const Page = () => {
  const { handleNavigate } = authNavigation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Email:", data.email);
    handleNavigate("signup/password");
  };

  return (
    <AuthLayout>
      <div className="form-container">
        {/* Back Button */}
        <Button variant="secondary" className="size-9 pointer">
          <ChevronLeft />
        </Button>

        {/* Title */}
        <div>
          <h3 className="heading">Create your account</h3>
          <p className="paragraph">Sign up to explore your favorite dishes.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="Enter your email address"
              type="text"
              {...register("email")}
            />
            {errors.email && (
              <ValidationMsg message={errors.email.message || ""} />
            )}
          </div>

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
    </AuthLayout>
  );
};

export default Page;

//todo Make a Validation
//todo Connect to Backend
//todo Fix span text size
//todo Update Input's css
//? Decide whether I need form and label etc
