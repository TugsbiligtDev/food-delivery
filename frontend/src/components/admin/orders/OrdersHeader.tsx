"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const OrdersHeader = () => {
  return (
    <div className="w-full flex justify-between items-center bg-white p-4 rounded-md">
      <div>
        <h3 className="font-bold text-midnight-black text-xl">Orders</h3>
        <p className="text-slate-gray text-sm font-medium">32 items</p>
      </div>
      <div className="flex flex-col gap-3 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              Select date
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 bg-white text-black"
            align="start"
          >
            <Calendar mode="single" captionLayout="dropdown" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default OrdersHeader;
