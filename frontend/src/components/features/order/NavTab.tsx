"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CartTab from "../card/CartTab";
import OrderTab from "./OrderTab";

interface OrderTabsProps {
  onCheckout: () => void;
}

const NavTab = ({ onCheckout }: OrderTabsProps) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Tabs defaultValue="Cart" className="w-full">
        <div className="relative p-1 bg-gray-100 rounded-full">
          <TabsList className="relative grid w-full h-12 grid-cols-2 p-0 bg-transparent">
            <TabsTrigger
              value="Cart"
              className="data-[state=active]:bg-cherry-red data-[state=active]:text-snow-white bg-white text-obsidian rounded-full cursor-pointer"
            >
              Cart
            </TabsTrigger>

            <TabsTrigger
              value="Order"
              className="data-[state=active]:bg-cherry-red data-[state=active]:text-snow-white bg-white text-obsidian rounded-full cursor-pointer"
            >
              Order
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-6">
          <TabsContent value="Cart" className="m-0 space-y-0">
            <CartTab onCheckout={onCheckout} />
          </TabsContent>

          <TabsContent value="Order" className="m-0 space-y-0">
            <OrderTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default NavTab;
