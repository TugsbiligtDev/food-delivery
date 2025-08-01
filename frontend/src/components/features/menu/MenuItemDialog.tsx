import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";

const MenuItemDialog = () => {
  return (
    <div>
      <DialogContent className="flex max-w-3xl text-black h-96">
        <div className="w-1/2">
          <img
            src="/sample.jpg"
            alt="Sample Item"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-between w-1/2">
          {/* top */}
          <div>
            <DialogTitle className="mb-2 text-3xl font-semibold text-cherry-red">
              Sample Item
            </DialogTitle>
            <DialogDescription className="text-base text-midnight-black">
              Sample description for this delicious menu item.
            </DialogDescription>
          </div>
          {/* bottom */}
          <div>
            <div className="flex items-center justify-between text-midnight-black">
              <div>
                <p className="text-base">Total price</p>
                <h3 className="text-2xl font-semibold">12.99</h3>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="button size-11">
                  <Minus />
                </Button>
                <h4 className="text-lg font-semibold">1</h4>
                <Button variant="outline" className="button size-11">
                  <Plus />
                </Button>
              </div>
            </div>
            <DialogClose asChild>
              <Button className="rounded-full long-button">Add to cart</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default MenuItemDialog;
