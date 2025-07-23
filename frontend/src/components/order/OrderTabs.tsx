"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CartTab from "../card/CartTab";
import OrderTab from "../order/OrderTab";

interface OrderTabsProps {
  onCheckout: () => void;
}

const OrderTabs = ({ onCheckout }: OrderTabsProps) => {
  const [activeTab, setActiveTab] = useState("Cart");

  return (
    <div className="w-full max-w-lg mx-auto">
      <Tabs defaultValue="Cart" className="w-full" onValueChange={setActiveTab}>
        <div className="relative bg-gray-100 rounded-full p-1">
          <TabsList className="relative bg-transparent w-full grid grid-cols-2 h-12 p-0">
            <TabsTrigger
              value="Cart"
              className="bg-cherry-red text-snow-white button"
            >
              Cart
            </TabsTrigger>

            <TabsTrigger value="Order" className="text-obsidian button">
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

export default OrderTabs;
