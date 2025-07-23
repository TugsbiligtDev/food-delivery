import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ValidationMsg from "./ValidationMsg";
import { UseFormRegister, FieldErrors, UseFormTrigger } from "react-hook-form";
import { SignupFormData } from "@/lib/schemas/auth";

interface EmailStepProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  trigger: UseFormTrigger<SignupFormData>;
  onNext: () => void;
}

const EmailStep = ({ register, errors, trigger, onNext }: EmailStepProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = await trigger("email");
    if (isEmailValid) onNext();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder="Enter your email address"
            type="email"
            {...register("email")}
            className="text-black"
          />
          {errors.email && (
            <ValidationMsg message={errors.email.message || ""} />
          )}
        </div>
        <Button className="long-button" type="submit">
          Let's Go
        </Button>
      </form>
    </div>
  );
};

export default EmailStep;
