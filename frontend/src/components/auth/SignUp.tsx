import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
const SignUp = () => {
  return (
    <div className="form-container">
      <Button variant="secondary" className="size-9 pointer">
        <ChevronLeft />
      </Button>
      <div>
        <h3 className="heading">Create your account</h3>
        <p className="paragraph">Sign up to explore your favorite dishes.</p>
      </div>
      <div>
        <Input placeholder="Enter your email address" type="text" />
        <p className="error">
          Invalid email. Use a format like example@email.com
        </p>
      </div>
      <Button className="long-button">Let's Go</Button>
      <div className="bottom-container">
        <p className="paragraph">Already have an account?</p>
        <Link href="/auth/login" className="accent">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
