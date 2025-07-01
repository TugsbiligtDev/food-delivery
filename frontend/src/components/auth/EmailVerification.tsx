import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const EmailVerification = () => {
  return (
    <div className="form-container">
      <Button variant="secondary" className="size-9 pointer">
        <ChevronLeft />
      </Button>
      <div>
        <h3 className="heading">Please verify Your Email</h3>
        <p className="paragraph">
          We just sent an email to
          <span className="text-[#18181B]">test@gmail.com.</span>Click the link
          in the email to verify your account.
        </p>
      </div>
      <Button className="long-button">Send link</Button>
    </div>
  );
};

export default EmailVerification;
