"use client";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { useCart } from "@/lib/contexts/CartContext";
import Image from "next/image";

const OrderInfo = () => {
  const { state, updateQuantity, removeItem } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No items in cart</div>
    );
  }

  return (
    <div className="space-y-3">
      {state.items.map((item) => (
        <div
          key={item.food._id}
          className="flex w-full gap-3 p-3 bg-white border border-gray-100 rounded-lg"
        >
          <div className="flex-shrink-0">
            <Image
              src={item.food.image}
              alt={item.food.foodName}
              width={100}
              height={100}
              className="object-cover size-25 rounded-xl"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="mb-1 text-base font-bold leading-5 text-cherry-red">
                  {item.food.foodName}
                </h4>
                <p className="text-xs leading-4 text-midnight-black line-clamp-2">
                  {item.food.ingredients}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0 p-0 text-cherry-red border-cherry-red size-8 pointer"
                onClick={() => removeItem(item.food._id)}
              >
                <Trash size={14} />
              </Button>
            </div>
            <div className="flex items-center justify-between text-midnight-black">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 size-8 hover:bg-gray-100 pointer"
                  onClick={() =>
                    updateQuantity(item.food._id, item.quantity - 1)
                  }
                >
                  <Minus size={16} />
                </Button>

                <span className="font-semibold text-lg px-2 min-w-[2rem] text-center">
                  {item.quantity}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 size-8 hover:bg-gray-100 pointer"
                  aria-label="Increase quantity"
                  onClick={() =>
                    updateQuantity(item.food._id, item.quantity + 1)
                  }
                >
                  <Plus size={16} />
                </Button>
              </div>

              <p className="text-base font-bold text-midnight-black">
                ${(item.food.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderInfo;
