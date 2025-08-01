"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Clock } from "lucide-react";
import OrderItem from "./OrderItem";
import { Button } from "../../ui/button";

const OrderTab = () => {
  return (
    <Card className="w-full max-w-lg bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h4 className="text-xl font-semibold text-midnight-black">
            Order history
          </h4>
        </div>

        <div className="space-y-4">
          <div>
            <OrderItem />
            <div className="mt-4 border-t border-gray-300 border-dashed" />
          </div>
          <div>
            <OrderItem />
            <div className="mt-4 border-t border-gray-300 border-dashed" />
          </div>
          <div>
            <OrderItem />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTab;
