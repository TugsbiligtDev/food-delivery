"use client";
import Link from "next/link";
import { Button } from "../ui/button";

const AuthButtons = () => {
  return (
    <>
      <Link href="/auth/signup">
        <Button className="mr-3 bg-cloude-gray text-obsidian button">
          Sign up
        </Button>
      </Link>
      <Link href="/auth/signin">
        <Button className="bg-cherry-red text-snow-white button">
          Sign in
        </Button>
      </Link>
    </>
  );
};

export default AuthButtons;
