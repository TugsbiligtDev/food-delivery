import { MapPin } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="bg-[#18181B] flex justify-between py-6 px-20">
      <div className="flex gap-3">
        <img src="/logo.png" alt="logo" className="w-[46px]" />
        <div>
          <h4 className="font-semibold text-xl leading-7 text-[#FAFAFA]">
            Nom <span className="text-[#EF4444]">Nom</span>
          </h4>
          <p className="font-normal text-xs leading-4 text-[#F4F4F5]">
            Swift delivery
          </p>
        </div>
      </div>
      <div>
        {/* <Button className="bg-[#F4F4F5] text-[#18181B] button mr-3">
          Sign up
        </Button>
        <Button className="bg-[#EF4444] text-[#FAFAFA] button">Log in</Button> */}
      </div>
    </div>
  );
};

export default Header;
