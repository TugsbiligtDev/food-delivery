import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdminAddCard from "./AdminAddCard";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const MenuAdd = () => {
  return (
    <div className="bg-white mt-10 p-5">
      <h4 className="font-semibold text-xl text-midnight-black mb-4">
        Appetizers. (6)
      </h4>
      <div className="grid grid-cols-3 gap-4">
        {/* separate */}
        <Dialog>
          <div className="bg-white rounded-[20px] border border-dashed border-cherry-red flex flex-col justify-center items-center">
            <DialogTrigger>
              <Button className="rounded-full size-11 bg-cherry-red text-white">
                <Plus />
              </Button>
              <p className="mt-3 text-sm font-medium leading-4 text-midnight-black">
                Add new Dish to Appetizers
              </p>
            </DialogTrigger>
          </div>
          <DialogContent className="bg-white text-midnight-black">
            <DialogHeader>
              <DialogTitle>Add new Dish to Appetizers</DialogTitle>
            </DialogHeader>
            <div className="flex justify-between flex-1">
              <div>
                <Label>Food name</Label> <Input />
              </div>
              <div>
                <Label>Food price</Label> <Input />
              </div>
            </div>
            <div>
              <Label>Ingredients</Label> <Textarea />
            </div>
            <div>
              <Label>Category</Label> <Input />
            </div>
            <div>
              <Label>Food Image</Label>
              {/* Cloudinary */}
            
            </div>
            <Button className="bg-midnight-black text-snow-white">Add</Button>
          </DialogContent>
        </Dialog>

        {/* <AdminAddCard />
        <AdminAddCard />
        <AdminAddCard />
        <AdminAddCard />
        <AdminAddCard /> */}
      </div>
    </div>
  );
};

export default MenuAdd;
