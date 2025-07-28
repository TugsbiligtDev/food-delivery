"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Clock } from "lucide-react";
import OrderItem from "./OrderItem";
import { Button } from "../../ui/button";

//replace with my API
const orderHistory = [
  {
    id: "#12345",
    totalPrice: 26.97,
    status: "Delivered" as const,
    items: [
      { name: "Sunshine Stackers", quantity: 1 },
      { name: "Buffalo Wings", quantity: 2 },
    ],
    orderDate: "2024/12/20",
    deliveryAddress: "123 Main Street, Downtown Area, City Center",
  },
  {
    id: "#12344",
    totalPrice: 18.99,
    status: "On the way" as const,
    items: [{ name: "Crispy Spring Rolls", quantity: 3 }],
    orderDate: "2024/12/19",
    deliveryAddress: "456 Oak Avenue, Residential District",
  },
  {
    id: "#12343",
    totalPrice: 34.5,
    status: "Pending" as const,
    items: [
      { name: "Loaded Nachos", quantity: 1 },
      { name: "Garlic Bread", quantity: 2 },
      { name: "Mozzarella Sticks", quantity: 1 },
    ],
    orderDate: "2024/12/18",
    deliveryAddress: "789 Pine Street, Business Quarter",
  },
];

const OrderTab = () => {
  const hasOrders = orderHistory.length > 0;

  return (
    <Card className="w-full max-w-lg bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h4 className="text-xl font-semibold text-midnight-black">
            Order history
          </h4>
        </div>

        {hasOrders ? (
          <div className="space-y-4">
            {orderHistory.map((order, index) => (
              <div key={order.id}>
                <OrderItem
                  id={order.id}
                  totalPrice={order.totalPrice}
                  status={order.status}
                  items={order.items}
                  orderDate={order.orderDate}
                  deliveryAddress={order.deliveryAddress}
                />

                {index < orderHistory.length - 1 && (
                  <div className="mt-4 border-t border-gray-300 border-dashed" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-8 bg-cloude-gray rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 mb-4">
              <img src="/logo.png" alt="logo" />
            </div>
            <h5 className="mb-2 text-lg font-semibold text-midnight-black">
              No Orders Yet?
            </h5>
            <p className="text-sm text-center text-slate-gray">
              When you place your first order, it will appear here with all the
              details.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTab;
