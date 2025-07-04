import Link from "next/link";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";

const Header = () => {
  return (
    <nav className="bg-[#18181B] flex justify-between py-6 px-20">
      <div className="flex gap-3">
        <img src="/logo.png" alt="logo" className="w-[46px]" />
        <div>
          <h4 className="font-semibold text-xl leading-7 text-[#FAFAFA]">
            Nom <span className="text-red">Nom</span>
          </h4>
          <p className="font-normal text-xs leading-4 text-[#F4F4F5]">
            Swift delivery
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {/* <Link href="/auth/signup">
          <Button className="bg-[#F4F4F5] text-[#18181B] button mr-3">
            Sign up
          </Button>
        </Link>
        <Link href="/auth/login">
          <Button className="bg-[#EF4444] text-[#FAFAFA] button">Log in</Button>
        </Link> */}
        <Button className="bg-white rounded-full">
          <MapPin className="text-red" />
          <span className="text-red">Delivery address:</span>
          <span className="text-[#71717A]">Add Location</span>
          <ChevronRight className="text-[#18181B]" />
        </Button>
        <Button className="bg-[#F4F4F5] size-9 rounded-full">
          <ShoppingCart />
        </Button>
        <Button className="bg-red size-9 rounded-full">
          <User />
        </Button>
      </div>
      <div className="bg-white absolute top-20 right-20 rounded-xl flex flex-col items-center px-5 py-2.5 gap-1">
        <h4 className="font-semibold text-xl leading-7">user@gmail.com</h4>
        <Button className="bg-[#F4F4F5] rounded-full font-normal text-[#18181B] text-sm ">
          Sign out
        </Button>
      </div>
    </nav>
  );
};

export default Header;
