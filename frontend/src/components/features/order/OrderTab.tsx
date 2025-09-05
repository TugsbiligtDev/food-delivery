"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import OrderItem from "./OrderItem";
import { getUserOrders } from "@/lib/api/orders";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Order } from "@/lib/types";
import Image from "next/image";

const OrderTab = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        const userOrders = await getUserOrders(user._id);
        setOrders(userOrders);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?._id]);

  if (loading) {
    return (
      <Card className="w-full max-w-lg bg-white">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cherry-red mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading orders...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-lg bg-white">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="w-full max-w-lg bg-white">
        <CardContent className="text-center py-8">
          <div className="mb-4">
            <Image
              src="/logo.png"
              alt="No orders"
              width={61}
              height={50}
              className="mx-auto mb-4"
            />
          </div>
          <h4 className="text-xl font-semibold text-midnight-black mb-2">
            No orders yet
          </h4>
          <p className="text-gray-600">
            Start ordering delicious food and track your orders here! 🍕
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h4 className="text-xl font-semibold text-midnight-black">
            Order history
          </h4>
        </div>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={order._id}>
              <OrderItem order={order} />
              {index < orders.length - 1 && (
                <div className="mt-4 border-t border-gray-300 border-dashed" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTab;
