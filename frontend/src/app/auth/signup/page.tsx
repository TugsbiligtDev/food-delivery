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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    axios
      .post("http://localhost:3001/auth/signup", { email, password })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    console.log("Email:", data.email);
    console.log("Password is valid:", data.password);
    handleNavigate("signup/password");
  };
  const [current, setCurrent] = useState(1);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                placeholder="Enter your email address"
                type="text"
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <ValidationMsg message={errors.email.message || ""} />
              )}
            </div>

            <Button
              className="long-button"
              type="submit"
              onClick={() => setCurrent(2)}
            >
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Input
                placeholder="Password"
                type={show ? "text" : "password"}
                {...register("password")}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.confirm && (
                <ValidationMsg message={errors.confirm.message || ""} />
              )}
            </div>
            <div className="flex gap-2" onClick={() => setShow(!show)}>
              <Checkbox />
              <Label className="font-normal text-sm leading-3.5 text-[#71717A]">
                Show password
              </Label>
            </div>
            <Button className="long-button" type="submit">
              Let's Go
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

//todo Connect to Backend
//todo checkbox change
