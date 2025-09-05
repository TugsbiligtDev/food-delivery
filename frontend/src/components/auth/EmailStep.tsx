"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ValidationMsg from "./ValidationMsg";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailStepProps {
  onNext: (email: string) => void;
}

const EmailStep = ({ onNext }: EmailStepProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      onNext(data.email);
    } catch {
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
            type="text"
            className="text-black"
            disabled={isLoading}
          />
          <ValidationMsg message={errors.email?.message || ""} />
        </div>
        <Button className="long-button" type="submit" disabled={isLoading}>
          {isLoading ? "Checking..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default EmailStep;
