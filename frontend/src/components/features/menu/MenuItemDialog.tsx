import { useCart } from "@/app/contexts/UseCart";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
interface MenuItemDialogProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}
const MenuItemDialog = ({
  id,
  title,
  price,
  description,
  image,
}: MenuItemDialogProps) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const [dialogQuantity, setDialogQuantity] = useState(1);
  const currentCartQuantity = getItemQuantity(id);

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setDialogQuantity((prev) => prev + 1);
    } else {
      setDialogQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleAddToCart = () => {
    if (currentCartQuantity > 0) {
      updateQuantity(id, currentCartQuantity + dialogQuantity);
    } else {
      for (let i = 0; i < dialogQuantity; i++) {
        addToCart({
          id,
          name: title,
          price,
          description,
          image,
        });
      }
    }
    setDialogQuantity(1);
  };
  const totalPrice = price * dialogQuantity;

  return (
    <div>
      <DialogContent className="flex max-w-3xl text-black h-96">
        <div className="w-1/2">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-between w-1/2">
          {/* top */}
          <div>
            <DialogTitle className="mb-2 text-3xl font-semibold text-cherry-red">
              {title}
            </DialogTitle>
            <DialogDescription className="text-base text-midnight-black">
              {description}
            </DialogDescription>
          </div>
          {/* bottom */}
          <div>
            <div className="flex items-center justify-between text-midnight-black">
              <div>
                <p className="text-base">Total price</p>
                <h3 className="text-2xl font-semibold">
                  {totalPrice.toFixed(2)}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="button size-11"
                  onClick={() => handleQuantityChange(false)}
                >
                  <Minus />
                </Button>
                <h4 className="text-lg font-semibold">{dialogQuantity}</h4>
                <Button
                  variant="outline"
                  className="button size-11"
                  onClick={() => handleQuantityChange(true)}
                >
                  <Plus />
                </Button>
              </div>
            </div>
            <DialogClose asChild>
              <Button
                className="rounded-full long-button"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default MenuItemDialog;
