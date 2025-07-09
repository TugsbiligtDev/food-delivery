"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import OrderItem from "./OrderItem";
const OrderTab = () => {
  return (
    <Card className="w-full max-w-lg bg-white">
      <CardContent>
        <h4 className="text-xl font-semibold text-midnight-black">
          Order history
        </h4>
        <OrderItem />
        <div className="border border-dashed w-full border-gray-400 my-3" />
        <OrderItem />
      </CardContent>
    </Card>
  );
};

export default OrderTab;
//TODO adjust height
//TODO adjust map image size
