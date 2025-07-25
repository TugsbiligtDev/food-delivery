import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Image, Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import AdminAddCard from "./AdminAddCard";

const MenuAdd = () => {
  return (
    <div className="bg-white mt-10 p-5">
      <h4 className="font-semibold text-xl text-midnight-black mb-4">
        Appetizers. (6)
      </h4>
      <div className="grid grid-cols-3 gap-4">
        <Dialog>
          <div className="bg-white rounded-[20px] border border-dashed border-cherry-red flex flex-col justify-center items-center p-10">
            <DialogTrigger asChild>
              <div>
                <Button className="rounded-full size-11 bg-cherry-red text-white">
                  <Plus />
                </Button>
                <p className="mt-3 text-sm font-medium leading-4 text-midnight-black">
                  Add new Dish to Appetizers
                </p>
              </div>
            </DialogTrigger>
          </div>
          <DialogContent className="bg-white text-midnight-black">
            <DialogHeader>
              <DialogTitle>Add new Dish to Appetizers</DialogTitle>
            </DialogHeader>
            <div className="flex justify-between flex-1 gap-6">
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
              <div className="w-full border border-dashed border-[#2563EB33] flex flex-col justify-center items-center bg-[#2563EB0D] px-4 py-10 gap-2 rounded-md  min-h-[200px]">
                <Image />
                <p>Choose a file or drag & drop it here</p>
              </div>
            </div>
            <Button className="bg-midnight-black text-snow-white pointer">
              Add
            </Button>
          </DialogContent>
        </Dialog>

        <AdminAddCard />
        <AdminAddCard />
        <AdminAddCard />
        <AdminAddCard />
        <AdminAddCard />
      </div>
    </div>
  );
};

export default MenuAdd;
