"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import OrderInfo from "../order/OrderInfo";
import Payment from "./Payment";

const CartTab = () => {
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
            Payment info
          </h4>

          <Payment />
          <Payment />
          <Payment />

          <div className="w-full my-2 border border-gray-400 border-dashed" />

          <Payment />
        </CardFooter>
      </Card>

      <Card className="w-full max-w-lg mt-5 bg-white">
        <CardContent>
          <form>
            <h4 className="text-xl font-semibold text-midnight-black">
              Delivery location
            </h4>
            <Textarea
              placeholder="Please share your complete address"
              className="mt-2 text-black"
              rows={3}
            />

            <h4 className="mt-4 text-xl font-semibold text-midnight-black">
              Phone number
            </h4>
            <Input
              placeholder="Please share your phone number"
              type="text"
              className="mt-2 text-black"
            />

            <Button
              type="submit"
              className="w-full mt-6 button bg-cherry-red text-snow-white disabled:opacity-50"
            >
              Checkout • $16.63
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CartTab;
