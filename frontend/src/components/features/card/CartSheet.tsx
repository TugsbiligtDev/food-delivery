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

const CartSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-snow-white text-obsidian size-9 button">
          <ShoppingCart />
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
