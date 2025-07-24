"use client";
import { useState, useMemo } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";

interface OrderInfoProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  initialQuantity: number;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const OrderInfo = ({
  id = 1,
  name,
  description,
  price,
  image,
  initialQuantity = 1,
  onQuantityChange,
  onRemove,
}: OrderInfoProps) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(id, newQuantity);
  };

  const decrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange?.(id, newQuantity);
  };

  const handleRemove = () => {
    onRemove?.(id);
  };

  const totalPrice = useMemo(() => price * quantity, [price, quantity]);

  return (
    <div className="w-full flex gap-3 p-3 bg-white rounded-lg border border-gray-100 ">
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="size-25 rounded-xl object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="text-cherry-red font-bold text-base leading-5 mb-1">
              {name}
            </h4>
            <p className="text-midnight-black text-xs leading-4 line-clamp-2">
              {description}
            </p>
          </div>

          <Button
            onClick={handleRemove}
            variant="outline"
            size="sm"
            className="flex-shrink-0 text-cherry-red border-cherry-red size-8 p-0 pointer"
          >
            <Trash size={14} />
          </Button>
        </div>
        <div className="flex justify-between items-center text-midnight-black">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0 hover:bg-gray-100 pointer"
              onClick={decrement}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </Button>

            <span className="font-semibold text-lg px-2 min-w-[2rem] text-center">
              {quantity}
            </span>

            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0 hover:bg-gray-100 pointer"
              onClick={increment}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </Button>
          </div>

          <p className="font-bold text-base text-midnight-black">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
