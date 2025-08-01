"use client";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../../ui/button";

const OrderInfo = () => {
  return (
    <div className="flex w-full gap-3 p-3 bg-white border border-gray-100 rounded-lg ">
      <div className="flex-shrink-0">
        <img
          src="/sample.jpg"
          alt="Sample Item"
          className="object-cover size-25 rounded-xl"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="mb-1 text-base font-bold leading-5 text-cherry-red">
              Sample Item
            </h4>
            <p className="text-xs leading-4 text-midnight-black line-clamp-2">
              Sample description for this delicious menu item.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0 p-0 text-cherry-red border-cherry-red size-8 pointer"
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
            >
              <Minus size={16} />
            </Button>

            <span className="font-semibold text-lg px-2 min-w-[2rem] text-center">
              1
            </span>

            <Button
              variant="ghost"
              size="sm"
              className="p-0 size-8 hover:bg-gray-100 pointer"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </Button>
          </div>

          <p className="text-base font-bold text-midnight-black">$12.99</p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
