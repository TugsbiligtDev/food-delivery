import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { ChevronLeft } from "lucide-react";
import { Label } from "../ui/label";
import Link from "next/link";
const PasswordCreate = () => {
  return (
    <div>
      <div className="form-container">
        <Button variant="secondary" className="size-9 pointer">
          <ChevronLeft />
        </Button>
        <div>
          <h3 className="heading">Create a strong password</h3>
          <p className="paragraph">
            Create a strong password with letters, numbers.
          </p>
        </div>
        <div>
          <Input placeholder="Password" type="text" />
          <Input placeholder="Confirm" type="text" />
          <p className="error">Those password did’t match, Try again</p>
          <p className="error">Those password did’t match, Try again</p>
        </div>
        <div className="flex gap-2">
          <Checkbox />
          <Label className="font-normal text-sm leading-3.5 text-[#71717A]">
            Show password
          </Label>
        </div>
        <Button className="long-button">Let's Go</Button>
        <div className="bottom-container">
          <p className="paragraph">Already have an account?</p>
          <Link href="/auth/login" className="accent">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordCreate;
