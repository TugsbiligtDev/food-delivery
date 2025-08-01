import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MenuItemDialog from "./MenuItemDialog";

const MenuCard = () => {
  return (
    <Card className="bg-white rounded-[20px]">
      <CardContent>
        <div className="relative">
          <img
            src="/sample.jpg"
            alt="Sample Item"
            className="object-cover w-full h-48 rounded-xl"
          />
          <Dialog>
            <DialogTrigger className="absolute flex items-center justify-center p-0 bg-white rounded-full bottom-3 right-3 text-cherry-red size-11">
              <Plus size={16} strokeWidth={3} />
            </DialogTrigger>
            <MenuItemDialog />
          </Dialog>
        </div>
        <CardTitle className="flex items-start justify-between mt-2">
          <h3 className="text-2xl font-semibold leading-8 text-cherry-red">
            Sample Item
          </h3>
          <h3 className="text-lg font-semibold leading-8 text-midnight-black">
            $12.99
          </h3>
        </CardTitle>
        <CardDescription className="mt-1 text-sm font-normal leading-5 text-midnight-black">
          Sample description for this delicious menu item.
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
