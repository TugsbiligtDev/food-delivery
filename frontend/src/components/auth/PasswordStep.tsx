import { useState } from "react";
import { Input } from "../ui/input";
import ValidationMsg from "./ValidationMsg";
import { Button } from "../ui/button";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { SignupFormData } from "@/lib/schemas/auth";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface PasswordStepProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  handleSubmit: UseFormHandleSubmit<SignupFormData>;
  onSubmit: (data: SignupFormData) => void;
  isLoading: boolean;
}
const PasswordStep = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isLoading,
}: PasswordStepProps) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Input
            placeholder="Password"
            type={show ? "text" : "password"}
            {...register("password")}
            className="text-black"
            disabled={isLoading}
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
            className="text-black"
            disabled={isLoading}
          />
          {errors.confirm && (
            <ValidationMsg message={errors.confirm.message || ""} />
          )}
        </div>
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={() => setShow(!show)}
        >
          <Checkbox className="border border-black" />
          <Label className="font-normal text-sm leading-3.5 text-[#71717A] cursor-pointer">
            Show password
          </Label>
        </div>

        <Button className="long-button" type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Let's Go"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordStep;
