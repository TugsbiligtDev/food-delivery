import { Input } from "../ui/input";
import ValidationMsg from "./ValidationMsg";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const PasswordStep = () => {
  return (
    <div>
      <form>
        <div className="mb-5">
          <Input
            placeholder="Password"
            type="password"
            className="text-black"
          />
          <ValidationMsg message="" />
        </div>

        <div className="mb-3">
          <Input placeholder="Confirm" type="password" className="text-black" />
          <ValidationMsg message="" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="show-password" />
          <Label
            htmlFor="show-password"
            className="font-normal text-sm leading-3.5 text-[#71717A] cursor-pointer"
          >
            Show password
          </Label>
        </div>

        <Button className="long-button" type="submit">
          Let's Go
        </Button>
      </form>
    </div>
  );
};

export default PasswordStep;
