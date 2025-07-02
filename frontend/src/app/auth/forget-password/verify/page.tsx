"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import authNavigation from "@/lib/authNavigation";
import AuthLayout from "../../AuthLayout";

const page = () => {
  const { handleNavigate } = authNavigation();
  return (
    <AuthLayout>
      <div className="form-container">
        <Button
          variant="secondary"
          className="size-9 pointer"
          onClick={() => handleNavigate("/auth/forget-password")}
        >
          <ChevronLeft />
        </Button>
        <div>
          <h3 className="heading">Please verify Your Email</h3>
          <p className="paragraph">
            We just sent an email to
            <span className="text-[#18181B]">test@gmail.com.</span> Click the
            link in the email to verify your account.
          </p>
        </div>
        <Button className="long-button">Send link</Button>
      </div>
    </AuthLayout>
  );
};

export default page;

//todo get space in span
//? If a user click Resend, what will happen
//* In my opinion, Page will reload and nothing will happen. Only send email again.
