"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { Food } from "@/lib/types";
import { useCart } from "@/lib/contexts/CartContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import Image from "next/image";
import { toast } from "sonner";

interface MenuItemDialogProps {
  food: Food;
}

const MenuItemDialog = ({ food }: MenuItemDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please sign in to add items to your cart");
      return;
    }

    addItem(food, quantity);
    toast.success(`${quantity}x ${food.foodName} added to cart!`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const totalPrice = food.price * quantity;

  return (
    <div>
      <DialogContent className="flex max-w-3xl text-black h-96">
        <div className="w-1/2">
          <Image
            src={food.image}
            alt={food.foodName}
            width={400}
            height={384}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-between w-1/2">
          <div>
            <DialogTitle className="mb-2 text-3xl font-semibold text-cherry-red">
              {food.foodName}
            </DialogTitle>
            <DialogDescription className="text-base text-midnight-black">
              {food.ingredients}
            </DialogDescription>
          </div>
          <div>
            <div className="flex items-center justify-between text-midnight-black">
              <div>
                <p className="text-base">Total price</p>
                <h3 className="text-2xl font-semibold">
                  {totalPrice.toFixed(2)}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="button size-11"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus />
                </Button>
                <h4 className="text-lg font-semibold">{quantity}</h4>
                <Button
                  variant="outline"
                  className="button size-11"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus />
                </Button>
              </div>
            </div>
            <DialogClose asChild>
              <Button
                className="rounded-full long-button"
                onClick={handleAddToCart}
              >
                {!user ? "Sign In to Add" : "Add to cart"}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default MenuItemDialog;
