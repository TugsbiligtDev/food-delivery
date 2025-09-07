"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import OrderInfo from "../order/OrderInfo";
import { useCart } from "@/lib/contexts/CartContext";
import { createOrder } from "@/lib/api/orders";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";

const CartTab = ({ onTabChange }: { onTabChange?: (tab: string) => void }) => {
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleCheckout = async (data: CheckoutFormData) => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    if (state.items.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        foodOrderItems: state.items.map((item) => ({
          food: item.food._id,
          quantity: item.quantity,
        })),
        totalPrice: state.totalPrice,
        deliveryAddress: data.address.trim(),
        deliveryPhone: data.phone.trim(),
      };

      await createOrder(orderData);
      clearCart();
      reset();
      onTabChange?.("Order");
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <Card className="w-full max-w-lg bg-white">
        <CardContent className="text-center py-8">
          <div className="mb-4">
            <Image
              src="/logo.png"
              alt="Empty cart"
              width={61}
              height={50}
              className="mx-auto mb-4"
            />
          </div>
          <h4 className="text-xl font-semibold text-midnight-black mb-2">
            Your cart is empty
          </h4>
          <p className="text-gray-600">
            Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
            cravings!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-lg bg-white">
        <CardContent>
          <h4 className="text-xl font-semibold text-midnight-black">My cart</h4>

          <div className="mt-3 space-y-3">
            <div>
              <OrderInfo />

              <div className="mt-4 border-t border-gray-300 border-dashed" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-1 px-6 pb-6">
          <h4 className="mb-2 text-xl font-semibold text-midnight-black">
            Order Summary
          </h4>

          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <span>Items ({state.totalItems}):</span>
              <span>${state.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${state.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-lg mt-5 bg-white">
        <CardContent>
          <form onSubmit={handleSubmit(handleCheckout)}>
            <h4 className="text-xl font-semibold text-midnight-black">
              Delivery location
            </h4>
            <Textarea
              placeholder="Please share your complete address"
              className="mt-2 text-black"
              rows={3}
              {...register("address")}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}

            <h4 className="mt-4 text-xl font-semibold text-midnight-black">
              Phone number
            </h4>
            <Input
              placeholder="Please share your phone number"
              type="tel"
              className="mt-2 text-black"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full mt-6 button bg-cherry-red text-snow-white disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading
                ? "Creating Order..."
                : `Checkout • $${state.totalPrice.toFixed(2)}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CartTab;
