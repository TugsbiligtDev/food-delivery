"use client";
import Link from "next/link";
import { useState } from "react";
import CartSheet from "../header/CartSheet";
import UserDropdown from "../header/UserDropDown";
import SuccessDialog from "../header/SuccessDialog";
import AuthButtons from "../header/AuthButtons";

const Header = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCheckout = () => {
    setShowSuccessDialog(true);
  };

  return (
    <>
      <header className="flex justify-between px-5 py-5 bg-obsidian">
        <Link href="/" className="flex gap-3">
          <img src="/logo.png" alt="logo" className="w-[46px]" />
          <div>
            <h4 className="text-xl font-semibold leading-7 text-snow-white">
              Nom <span className="text-cherry-red">Nom</span>
            </h4>
            <p className="text-xs font-normal leading-4 text-cloude-gray">
              Swift delivery
            </p>
          </div>
        </Link>

        <div className="flex gap-2">
          {isLoggedIn ? (
            <AuthButtons />
          ) : (
            <>
              <CartSheet onCheckout={handleCheckout} />
              <UserDropdown />
            </>
          )}
        </div>
      </header>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </>
  );
};

export default Header;

//TODO figure out how do I know did user login
//TODO adjust tabs & cards width
//TODO make ordertab content
//TODO how do I delete food?
//TODO pass total price & fee by props
//TODO how do I pass food items total price to payment info
//TODO get address and phone number
//TODO when I click checkout,msg shown and sheet order appear differently
//? Do I close sheet when order created successfully
