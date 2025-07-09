"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import OrderInfo from "./OrderInfo";
import Payment from "./Payment";

interface CartTabProps {
  onCheckout: () => void;
}

const CartTab = ({ onCheckout }: CartTabProps) => {
  return (
    <>
      {/* top card */}
      <Card className="w-full max-w-lg bg-white">
        <CardContent>
          <h4 className="order-card-title">My cart</h4>
          <OrderInfo />
          <OrderInfo />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <h4 className="order-card-title">Payment info</h4>
          <Payment />
          <Payment />
          <div className="border border-dashed w-full border-gray-400" />
          <Payment />
        </CardFooter>
      </Card>

      {/* bottom card */}
      <Card className="w-full max-w-lg bg-white mt-5">
        <CardContent>
          <h4 className="order-card-title">Delivery location</h4>
          <Textarea
            placeholder="Please share your complete address"
            className="text-black"
          />
          <h4 className="order-card-title mt-1">Phone number</h4>
          <Input
            placeholder="Please share your phone number"
            className="text-black"
          />
          <Button
            onClick={onCheckout}
            className="button w-full bg-cherry-red text-snow-white mt-4"
          >
            Checkout
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default CartTab;
