"use client";
import Link from "next/link";
import Image from "next/image";
import CartSheet from "../features/card/CartSheet";
import UserDropdown from "../auth/UserDropDown";
import { useAuth } from "@/lib/contexts/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <>
      <header className="flex justify-between px-5 py-5 bg-obsidian">
        <Link href="/" className="flex gap-3">
          <Image
            src="/logo.png"
            alt="Nom Nom food delivery logo"
            width={46}
            height={46}
            className="w-[46px]"
            priority
          />
          <div>
            <h1 className="text-xl font-semibold leading-7 text-snow-white">
              Nom <span className="text-cherry-red">Nom</span>
            </h1>
            <p className="text-xs font-normal leading-4 text-cloude-gray">
              Swift delivery
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {user && <CartSheet />}
          <UserDropdown />
        </nav>
      </header>
    </>
  );
};

export default Header;
