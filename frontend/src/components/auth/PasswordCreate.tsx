"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { ChevronLeft } from "lucide-react";
import { Label } from "../ui/label";
import Link from "next/link";
import ValidationMsg from "./ValidationMsg";
import { useState } from "react";
type Props = {
  prev: () => void;
};
const schema = z
  .object({
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
const PasswordCreate = ({ prev }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Password is valid:", data.password);
  };

  const [show, setShow] = useState(false);

  return (
    <div className="form-container">
      <Button variant="secondary" className="size-9 pointer" onClick={prev}>
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
            onChange={() => {}}
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
  );
};

export default PasswordCreate;
