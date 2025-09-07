import { UseFormRegister, FieldErrors, UseFormTrigger } from "react-hook-form";
import { SignupFormData } from "@/lib/schemas/auth";

export interface EmailStepProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  trigger: UseFormTrigger<SignupFormData>;
  onNext: () => void;
}
