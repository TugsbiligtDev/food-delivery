"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CartTab from "../card/CartTab";
import OrderTab from "./OrderTab";

interface OrderTabsProps {
  onCheckout: () => void;
}

const NavTab = ({ onCheckout }: OrderTabsProps) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Tabs defaultValue="Cart" className="w-full">
        <div className="relative bg-gray-100 rounded-full p-1">
          <TabsList className="relative bg-transparent w-full grid grid-cols-2 h-12 p-0">
            <TabsTrigger
              value="Cart"
              className="data-[state=active]:bg-cherry-red data-[state=active]:text-snow-white bg-white text-obsidian button"
            >
              Cart
            </TabsTrigger>

            <TabsTrigger
              value="Order"
              className="data-[state=active]:bg-cherry-red data-[state=active]:text-snow-white bg-white text-obsidian button"
            >
              Order
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-6">
          <TabsContent value="Cart" className="space-y-0 m-0">
            <CartTab onCheckout={onCheckout} />
          </TabsContent>

          <TabsContent value="Order" className="space-y-0 m-0">
            <OrderTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default NavTab;
