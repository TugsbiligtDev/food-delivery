export interface EmailStepProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  trigger: UseFormTrigger<SignupFormData>;
  onNext: () => void;
}
