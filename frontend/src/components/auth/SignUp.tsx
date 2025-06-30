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
      <Input placeholder="Enter your email address" type="text" />
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
