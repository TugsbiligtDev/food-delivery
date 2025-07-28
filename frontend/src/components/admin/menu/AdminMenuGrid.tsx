import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddDishCard from "./AddDishCard";
import AddDishDialog from "./AddDishDialog";

const AdminMenuGrid = () => {
  return (
    <div className="p-5 mt-10 bg-white">
      <h4 className="mb-4 text-xl font-semibold text-midnight-black">
        Appetizers. (6)
      </h4>
      <div className="grid grid-cols-3 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <div className="bg-white rounded-[20px] border border-dashed border-cherry-red flex flex-col justify-center items-center cursor-pointer">
              <Button className="text-white rounded-full size-11 bg-cherry-red">
                <Plus />
              </Button>
              <p className="mt-3 text-sm font-medium leading-4 text-midnight-black">
                Add new Dish to Appetizers
              </p>
            </div>
          </DialogTrigger>
          <AddDishDialog />
        </Dialog>
        <AddDishCard />
        <AddDishCard />
        <AddDishCard />
        <AddDishCard />
        <AddDishCard />
        <AddDishCard />
        <AddDishCard />
      </div>
    </div>
  );
};

export default AdminMenuGrid;
