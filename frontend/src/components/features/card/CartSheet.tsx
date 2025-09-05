"use client";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavTab from "../order/NavTab";
import { useCart } from "@/lib/contexts/CartContext";

const CartSheet = () => {
  const { state } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-snow-white text-obsidian size-9 button relative">
          <ShoppingCart />
          {state.totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-cherry-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
              {state.totalItems}
            </div>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-[#404040] text-white p-6 overflow-x-scroll">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <ShoppingCart />
            <SheetTitle className="text-xl font-semibold text-cloude-gray">
              Order detail
            </SheetTitle>
          </div>
        </div>

        <NavTab />
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
