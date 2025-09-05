"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EmailStep from "@/components/auth/EmailStep";
import PasswordStep from "@/components/auth/PasswordStep";

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleEmailNext = (userEmail: string) => {
    setEmail(userEmail);
    setCurrentStep("password");
  };

  const handlePasswordBack = () => {
    setCurrentStep("email");
  };

  const handleBackButton = () => {
    if (currentStep === "password") {
      setCurrentStep("email");
    } else {
      router.back();
    }
  };

  return (
    <div className="form-container">
      <Button
        variant="outline"
        className="size-9 pointer text-obsidian"
        onClick={handleBackButton}
      >
        <ChevronLeft />
      </Button>

      {currentStep === "email" && (
        <>
          <div className="space-y-2">
            <h3 className="heading">Create your account</h3>
            <p className="paragraph">
              Sign up to explore your favorite dishes.
            </p>
          </div>
          <EmailStep onNext={handleEmailNext} />
        </>
      )}

      {currentStep === "password" && (
        <>
          <div className="space-y-2">
            <h3 className="heading">Create a strong password</h3>
            <p className="paragraph">
              Create a strong password with letters, numbers, and symbols.
            </p>
          </div>
          <PasswordStep email={email} onBack={handlePasswordBack} />
        </>
      )}

      <div className="bottom-container">
        <p className="paragraph">Already have an account?</p>
        <Link href="/auth/signin" className="accent">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
