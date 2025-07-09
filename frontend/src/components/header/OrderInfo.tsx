"use client";
import { useState, useMemo } from "react";
import { Minus, Plus, Trash, X } from "lucide-react";
import { Button } from "../ui/button";

const OrderInfo = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const foodPrice = useMemo(() => 12.99 * quantity, [quantity]);

  return (
    <div className="w-full flex justify-between mt-3">
      {/* Food image */}
      <img
        src="/cardImage.png"
        alt="food"
        className="aspect-square size-full max-w-[120px] rounded-xl object-cover"
      />
      {/* Food info */}
      <div className="ml-3">
        {/* Tittle & Description */}
        <div className="flex">
          <div>
            <h4 className="text-cherry-red font-bold text-base">
              Sunshine Stackers
            </h4>
            <p className="text-midnight-black text-xs wrap-break-word">
              Fluffy pancakes stacked with fruits, cream, syrup, and powdered
              sugar.
            </p>
          </div>
          <Button className="text-cherry-red button border border-cherry-red ml-1.5 size-9">
            <Trash />
          </Button>
        </div>
        {/* Quantity & Price */}
        <div className="flex justify-between items-center text-midnight-black">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="size-9 pointer"
              onClick={decrement}
            >
              <Minus />
            </Button>
            <h3 className="font-semibold text-lg ">{quantity}</h3>
            <Button
              variant="ghost"
              className="size-9 pointer"
              onClick={increment}
            >
              <Plus />
            </Button>
          </div>
          <p className="font-bold text-base">{foodPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
