"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CartSheet from "../features/card/CartSheet";
import UserDropdown from "../auth/UserDropDown";
import SuccessDialog from "../features/card/SuccessDialog";
import AuthButtons from "../auth/AuthButtons";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCart } from "@/app/contexts/UseCart";

const Header = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { isLoggedIn } = useAuth();
  const { cartCount } = useCart();

  const handleCheckout = () => {
    setShowSuccessDialog(true);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <>
      <header className="flex justify-between px-5 py-5 bg-obsidian">
        <Link href="/" className="flex gap-3">
          <img
            src="/logo.png"
            alt="Nom Nom food delivery logo"
            className="w-[46px]"
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

        <nav className="flex gap-2">
          {isLoggedIn ? (
            <>
              <div className="relative">
                <CartSheet onCheckout={handleCheckout} />
                {cartCount > 0 && (
                  <div className="absolute z-10 flex items-center justify-center text-xs font-medium rounded-full -top-2 -right-2 bg-cherry-red text-snow-white size-5">
                    {cartCount > 10 ? "10+" : cartCount}
                  </div>
                )}
              </div>
              <UserDropdown />
            </>
          ) : (
            <AuthButtons />
          )}
        </nav>
      </header>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={handleCloseSuccessDialog}
      />
    </>
  );
};

export default Header;
