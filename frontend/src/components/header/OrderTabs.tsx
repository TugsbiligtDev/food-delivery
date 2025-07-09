"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CartTab from "./CartTab";
import OrderTab from "./OrderTab";

interface OrderTabsProps {
  onCheckout: () => void;
}

const OrderTabs = ({ onCheckout }: OrderTabsProps) => {
  return (
    <Tabs defaultValue="Cart">
      <TabsList className="text-black w-full rounded-full bg-white flex py-1 px-1 font-normal text-lg">
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
      <TabsContent value="Cart">
        <CartTab onCheckout={onCheckout} />
      </TabsContent>
      <TabsContent value="Order">
        <OrderTab />
      </TabsContent>
    </Tabs>
  );
};

export default OrderTabs;
