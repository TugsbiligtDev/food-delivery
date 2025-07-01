import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronLeft } from "lucide-react";

const Login = () => {
  return (
    <div className="form-container">
      <Button variant="secondary" className="size-9 pointer">
        <ChevronLeft />
      </Button>
      <div>
        <h3 className="heading">Log in</h3>
        <p className="paragraph">Log in to enjoy your favorite dishes.</p>
      </div>
      <div>
        <Input placeholder="Enter your email address" type="text" />
        <p className="error">
          Invalid email. Use a format like example@email.com.
        </p>
      </div>
      <div>
        <Input placeholder="Enter your password" type="text" />
        <p className="error">Incorrect password. Please try again.</p>
      </div>
      <Link
        href="/auth/reset-password"
        className="font-normal text-sm leading-5 text-[#18181B] underline mb-2"
      >
        Forgot password ?
      </Link>
      <Button className="long-button">Let's Go</Button>
      <div className="bottom-container">
        <p className="paragraph">Don’t have an account?</p>
        <Link href="/auth/signup" className="accent">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
