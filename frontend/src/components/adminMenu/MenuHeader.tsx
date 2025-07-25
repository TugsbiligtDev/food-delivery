import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const MenuHeader = () => {
  return (
    <div className="bg-white p-6">
      <h4 className="font-semibold text-xl text-midnight-black mb-4">
        Dishes category
      </h4>
      <div className="space-x-3">
        <Button className="rounded-full font-medium text-sm text-obsidian border border-[#E4E4E7] focus:border-cherry-red">
          All Dishes
          <Badge className="bg-obsidian py-0.5 px-2.5 text-snow-white rounded-full">
            112
          </Badge>
        </Button>
        <Button className="rounded-full font-medium text-sm text-obsidian border border-[#E4E4E7] focus:border-cherry-red">
          All Dishes
          <Badge className="bg-obsidian py-0.5 px-2.5 text-snow-white rounded-full">
            112
          </Badge>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-cherry-red rounded-full size-9">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-midnight-black">
            <DialogHeader>
              <DialogTitle className="font-semibold text-lg leading-7">
                Add new Dish to Appetizers
              </DialogTitle>
            </DialogHeader>
            <div>
              <Label className="form-label">Ingredients</Label> <Input />
            </div>
            <DialogClose asChild>
              <Button className="bg-midnight-black text-snow-white pointer w-fit">
                Add Dish
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MenuHeader;
