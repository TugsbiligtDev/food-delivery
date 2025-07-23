"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from "@/app/contexts/UseCart"; // Add this import
import OrderInfo from "../order/OrderInfo";
import Payment from "./Payment";

interface CartTabProps {
  onCheckout: () => void;
}

const CartTab = ({ onCheckout }: CartTabProps) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const hasItems = cartItems.length > 0;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = hasItems ? 2.99 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = async () => {
    if (!address.trim() || !phone.trim()) {
      alert("Please fill in your delivery address and phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onCheckout();
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-lg bg-white">
        <CardContent>
          <h4 className="font-semibold text-xl text-midnight-black">My cart</h4>

          {hasItems ? (
            <>
              <div className="mt-3 space-y-3">
                {cartItems.map((item) => (
                  <OrderInfo
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                    initialQuantity={item.quantity}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full bg-cloude-gray flex flex-col items-center justify-center gap-3 px-12 py-8 rounded-xl mt-3">
              <img src="/logo.png" alt="logo" className="size-16" />
              <p className="font-bold text-midnight-black text-base">
                Your cart is empty
              </p>
              <p className="text-xs text-slate-gray text-center">
                Hungry? 🍔 Add some delicious dishes to your cart and satisfy
                your cravings!
              </p>
            </div>
          )}
        </CardContent>

        {hasItems && (
          <CardFooter className="flex flex-col items-start gap-1 px-6 pb-6">
            <h4 className="font-semibold text-xl text-midnight-black mb-2">
              Payment info
            </h4>

            <Payment label="Subtotal" amount={subtotal} />
            <Payment label="Delivery" amount={deliveryFee} />
            <Payment label="Tax" amount={tax} />

            <div className="border border-dashed w-full border-gray-400 my-2" />

            <Payment label="Total" amount={total} isTotal={true} />
          </CardFooter>
        )}
      </Card>

      <Card className="w-full max-w-lg bg-white mt-5">
        <CardContent>
          <h4 className="font-semibold text-xl text-midnight-black">
            Delivery location
          </h4>
          <Textarea
            placeholder="Please share your complete address"
            className="text-black mt-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
          />

          <h4 className="font-semibold text-xl text-midnight-black mt-4">
            Phone number
          </h4>
          <Input
            placeholder="Please share your phone number"
            className="text-black mt-2"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button
            onClick={handleCheckout}
            className="button w-full bg-cherry-red text-snow-white mt-6 disabled:opacity-50"
            disabled={!hasItems || isSubmitting}
          >
            {isSubmitting
              ? "Processing..."
              : hasItems
              ? `Checkout • $${total.toFixed(2)}`
              : "Checkout"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default CartTab;
