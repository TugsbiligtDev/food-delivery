"use client";
import React from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MenuItemDialog from "./MenuItemDialog";
import { Food } from "@/lib/types";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "sonner";

interface MenuCardProps {
  food: Food;
}

const MenuCard = ({ food }: MenuCardProps) => {
  const { user } = useAuth();

  const handlePlusClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Please sign in to add items to your cart");
      return;
    }
  };

  return (
    <Card className="bg-white rounded-[20px]">
      <CardContent>
        <div className="relative">
          <Image
            src={food.image}
            alt={food.foodName}
            width={400}
            height={192}
            className="object-cover w-full h-48 rounded-xl"
            loading="lazy"
          />
          <Dialog>
            <DialogTrigger
              className="absolute flex items-center justify-center p-0 bg-white rounded-full bottom-3 right-3 text-cherry-red size-11"
              onClick={handlePlusClick}
            >
              <Plus size={16} strokeWidth={3} />
            </DialogTrigger>
            <MenuItemDialog food={food} />
          </Dialog>
        </div>
        <CardTitle className="flex items-start justify-between mt-2">
          <h3 className="text-2xl font-semibold leading-8 text-cherry-red">
            {food.foodName}
          </h3>
          <h3 className="text-lg font-semibold leading-8 text-midnight-black">
            ${food.price.toFixed(2)}
          </h3>
        </CardTitle>
        <CardDescription className="mt-1 text-sm font-normal leading-5 text-midnight-black">
          {food.ingredients}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
