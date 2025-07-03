"use client";
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
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Logging in with:", data);
    //todo connect to backend
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
              type="text"
              {...register("email")}
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
            />
            {errors.password && (
              <ValidationMsg message={errors.password.message || ""} />
            )}
          </div>
          <Link
            href="/auth/forget-password"
            className="font-normal text-sm leading-5 text-[#18181B] underline mb-2"
          >
            Forgot password ?
          </Link>
          <Button className="long-button" type="submit">
            Let's Go
          </Button>
        </form>
        <div className="bottom-container">
          <p className="paragraph">Don’t have an account?</p>
          <Link href="/auth/signup" className="accent">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default page;

//todo connect to backend
