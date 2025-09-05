"use client";
import React, { useState } from "react";
import { Pen, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditDishDialog from "./EditDishDialog";
import { Food, Category } from "@/lib/types";

interface AdminMenuGridItemProps {
  food: Food;
  categories: Category[];
  onFoodUpdated: (updatedFood: Food) => void;
  onFoodDeleted: (foodId: string) => Promise<void>;
  onImageError: (foodId: string) => void;
  hasImageError: boolean;
}

const AdminMenuGridItem = ({
  food,
  categories,
  onFoodUpdated,
  onFoodDeleted,
  onImageError,
  hasImageError,
}: AdminMenuGridItemProps) => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  return (
    <div className="bg-white rounded-[20px] p-4 border border-[#E4E4E7] relative">
      <div className="relative">
        {hasImageError || !food.image ? (
          <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No image</p>
            </div>
          </div>
        ) : (
          <img
            src={food.image}
            alt={food.foodName}
            className="object-cover w-full h-48 rounded-xl"
            onError={() => onImageError(food._id)}
          />
        )}

        {/* Pen button moved to image's bottom-right */}
        <div className="absolute bottom-3 right-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-white text-cherry-red hover:bg-gray-50 rounded-full w-8 h-8 p-0 shadow-sm"
                onClick={() => setSelectedFood(food)}
              >
                <Pen size={16} />
              </Button>
            </DialogTrigger>
            <EditDishDialog
              food={selectedFood!}
              categories={categories}
              onFoodUpdated={onFoodUpdated}
              onFoodDeleted={onFoodDeleted}
            />
          </Dialog>
        </div>
      </div>

      <div className="flex items-start justify-between mt-4">
        <h3 className="text-sm font-medium leading-5 text-cherry-red">
          {food.foodName}
        </h3>
        <h3 className="text-xs font-normal leading-4 text-midnight-black">
          ${food.price.toFixed(2)}
        </h3>
      </div>

      <p className="mt-1 text-xs font-normal leading-4 text-midnight-black">
        {food.ingredients}
      </p>
    </div>
  );
};

export default AdminMenuGridItem;
