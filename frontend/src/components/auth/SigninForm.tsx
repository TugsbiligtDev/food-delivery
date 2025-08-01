import React from "react";
import { Input } from "../ui/input";
import ValidationMsg from "./ValidationMsg";
import Link from "next/link";
import { Button } from "../ui/button";

const SigninForm = () => {
  return (
    <div>
      <form>
        <div className="mb-5">
          <Input
            placeholder="Enter your email address"
            type="email"
            className="text-black"
          />
          <ValidationMsg message="" />
        </div>

        <div className="mb-3">
          <Input
            placeholder="Enter your password"
            type="password"
            className="text-black"
          />
          <ValidationMsg message="" />
        </div>

        <Link
          href="/auth/forget-password"
          className="block mb-2 text-sm font-normal leading-5 underline text-black-20"
        >
          Forgot password ?
        </Link>

        <Button className="long-button" type="submit">
          Let's Go
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
