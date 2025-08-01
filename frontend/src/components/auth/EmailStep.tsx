import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ValidationMsg from "./ValidationMsg";

const EmailStep = () => {
  return (
    <div>
      <form>
        <div>
          <Input
            placeholder="Enter your email address"
            type="email"
            className="text-black"
          />
          <ValidationMsg message="" />
        </div>
        <Button className="long-button" type="submit">
          Let's Go
        </Button>
      </form>
    </div>
  );
};

export default EmailStep;
