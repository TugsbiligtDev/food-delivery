import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import SigninForm from "@/components/auth/SigninForm";

const Page = () => {
  return (
    <div className="form-container">
      <Button variant="outline" className="size-9 pointer text-obsidian">
        <ChevronLeft />
      </Button>

      <div className="space-y-2">
        <h3 className="heading">Log in</h3>
        <p className="paragraph">Log in to enjoy your favorite dishes.</p>
      </div>

      <SigninForm />

      <div className="bottom-container">
        <p className="paragraph">Don&apos;t have an account?</p>
        <Link href="/auth/signup" className="accent">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Page;
