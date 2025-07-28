"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from "@/app/contexts/UseCart";
import OrderInfo from "../order/OrderInfo";
import Payment from "./Payment";
import { useForm } from "react-hook-form";
import { CheckoutFormData, checkoutSchema } from "@/lib/schemas/checkout";
import { zodResolver } from "@hookform/resolvers/zod";

interface CartTabProps {
  onCheckout: () => void;
}

const CartTab = ({ onCheckout }: CartTabProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({ resolver: zodResolver(checkoutSchema) });

  const handleCheckout = async (data: CheckoutFormData) => {
    // TODO: Implement checkout after admin panel is complete
    alert(
      "Checkout will be available after admin panel creates real food data!"
    );
    return;

    /* COMMENTED OUT UNTIL ADMIN CREATES REAL DATA
    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");
      
      if (!token) {
        alert('Please login to place an order');
        return;
      }

      // Convert numeric IDs to ObjectId format for development
      const convertToObjectId = (numId) => {
        return numId.toString().padStart(24, '0').replace(/^0+/, '507f1f77bcf86cd7994390') + numId.toString().padEnd(2, '0');
      };

      const orderData = {
        foodOrderItems: cartItems.map((item) => ({
          food: item._id || convertToObjectId(item.id), // Convert numeric ID to ObjectId format
          quantity: item.quantity,
        })),
        totalPrice: total,
        status: "PENDING",
      };

      console.log("Order data being sent:", orderData);

      const response = await axios.post('https://food-delivery-9lk5.onrender.com/api/orders', orderData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.data.success) {
        clearCart();
        reset();
        onCheckout();
        alert("Order placed successfully!");
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          alert('Session expired. Please login again.');
        } else if (error.response?.status === 400) {
          alert('Invalid order data. Please check your information.');
        } else {
          alert('Failed to place order. Please try again.');
        }
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  return (
    <>
      <Card className="w-full max-w-lg bg-white">
        <CardContent>
          <h4 className="text-xl font-semibold text-midnight-black">My cart</h4>

          {hasItems ? (
            <div className="mt-3 space-y-3">
              {cartItems.map((item, index) => (
                <div key={index}>
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

                  {index < cartItems.length - 1 && (
                    <div className="mt-4 border-t border-gray-300 border-dashed" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full gap-3 px-12 py-8 mt-3 bg-cloude-gray rounded-xl">
              <img src="/logo.png" alt="logo" className="size-16" />
              <p className="text-base font-bold text-midnight-black">
                Your cart is empty
              </p>
              <p className="text-xs text-center text-slate-gray">
                Hungry? 🍔 Add some delicious dishes to your cart and satisfy
                your cravings!
              </p>
            </div>
          )}
        </CardContent>

        {hasItems && (
          <CardFooter className="flex flex-col items-start gap-1 px-6 pb-6">
            <h4 className="mb-2 text-xl font-semibold text-midnight-black">
              Payment info
            </h4>

            <Payment label="Subtotal" amount={subtotal} />
            <Payment label="Delivery" amount={deliveryFee} />
            <Payment label="Tax" amount={tax} />

            <div className="w-full my-2 border border-gray-400 border-dashed" />

            <Payment label="Total" amount={total} isTotal={true} />
          </CardFooter>
        )}
      </Card>

      <Card className="w-full max-w-lg mt-5 bg-white">
        <CardContent>
          <form onSubmit={handleSubmit(handleCheckout)}>
            <h4 className="text-xl font-semibold text-midnight-black">
              Delivery location
            </h4>
            <Textarea
              placeholder="Please share your complete address"
              {...register("address")}
              disabled={isSubmitting}
              className="mt-2 text-black"
              rows={3}
            />
            {errors.address && (
              <p className="text-blue-500">{errors.address.message}</p>
            )}

            <h4 className="mt-4 text-xl font-semibold text-midnight-black">
              Phone number
            </h4>
            <Input
              placeholder="Please share your phone number"
              type="text"
              {...register("phone")}
              disabled={isSubmitting}
              className="mt-2 text-black"
            />
            {errors.phone && (
              <p className="text-blue-500">{errors.phone.message}</p>
            )}

            <Button
              type="submit"
              className="w-full mt-6 button bg-cherry-red text-snow-white disabled:opacity-50"
              disabled={!hasItems || isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : hasItems
                ? `Checkout • $${total.toFixed(2)}`
                : "Checkout"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CartTab;
