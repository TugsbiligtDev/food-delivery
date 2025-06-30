import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
const PasswordReset = () => {
  return (
    <div className="form-container">
      <Button variant="secondary" className="size-9 pointer">
        <ChevronLeft />
      </Button>
      <div>
        <h3 className="heading">Reset your password </h3>
        <p className="paragraph">
          Enter your email to receive a password reset link.
        </p>
      </div>
      <Input placeholder="Enter your email address" type="text" />
      <Button className="long-button">Send link</Button>
      <div className="bottom-container">
        <p className="paragraph">Don’t have an account?</p>
        <Link href="/auth/signup" className="accent">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default PasswordReset;
