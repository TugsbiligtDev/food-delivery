"use client";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import OrderTabs from "./OrderTabs";

interface CartSheetProps {
  onCheckout: () => void;
}

const CartSheet = ({ onCheckout }: CartSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-snow-white text-obsidian size-9 button">
          <ShoppingCart />
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-[#404040] text-white p-6">
        <div className="flex items-center justify-between text-cloude-gray">
          <div className="flex gap-2">
            <ShoppingCart />
            <SheetTitle className="font-semibold text-xl">
              Order detail
            </SheetTitle>
          </div>
          <SheetClose className="button">
            <X />
          </SheetClose>
        </div>

        <OrderTabs onCheckout={onCheckout} />
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
