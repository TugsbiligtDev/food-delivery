import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import EmailStep from "@/components/auth/EmailStep";
import PasswordStep from "@/components/auth/PasswordStep";

const SignupPage = () => {
  return (
    <div className="form-container">
      <Button variant="outline" className="size-9 pointer text-obsidian">
        <ChevronLeft />
      </Button>

      {/* Email Step */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h3 className="heading">Create your account</h3>
          <p className="paragraph">Sign up to explore your favorite dishes.</p>
        </div>

        <EmailStep />
      </section>

      {/* Password Step - Hidden by default, can be shown with logic later */}
      <section className="space-y-6 hidden">
        <div className="space-y-2">
          <h3 className="heading">Create a strong password</h3>
          <p className="paragraph">
            Create a strong password with letters, numbers.
          </p>
        </div>

        <PasswordStep />
      </section>

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
