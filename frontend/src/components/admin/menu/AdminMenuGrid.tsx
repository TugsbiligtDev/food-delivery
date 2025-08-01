"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pen, Plus } from "lucide-react";
import AddDishDialog from "./AddDishDialog";
import EditDishDialog from "./EditDishDialog";

const AdminMenuGrid = () => {
  return (
    <div>
      <div className="p-5 mt-10 bg-white">
        <h4 className="mb-4 text-xl font-semibold text-midnight-black">
          Appetizers
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

          <div className="bg-white rounded-[20px] p-4 border border-[#E4E4E7]">
            <div className="relative">
              <img
                src="/sample-food.jpg"
                alt="Sample Dish"
                className="object-cover w-full h-48 rounded-xl"
              />

              <Dialog>
                <DialogTrigger className="absolute flex items-center justify-center p-0 bg-white rounded-full cursor-pointer right-3 bottom-4 size-11 text-cherry-red">
                  <Pen size={16} />
                </DialogTrigger>
                <EditDishDialog />
              </Dialog>
            </div>

            <div className="flex items-start justify-between mt-4">
              <h3 className="text-sm font-medium leading-5 text-cherry-red">
                Sample Appetizer
              </h3>
              <h3 className="text-xs font-normal leading-4 text-midnight-black">
                $12.99
              </h3>
            </div>

            <p className="mt-1 text-xs font-normal leading-4 text-midnight-black">
              Fresh ingredients with herbs and spices
            </p>
          </div>

          <div className="bg-white rounded-[20px] p-4 border border-[#E4E4E7]">
            <div className="relative">
              <img
                src="/sample-food2.jpg"
                alt="Another Dish"
                className="object-cover w-full h-48 rounded-xl"
              />

              <Dialog>
                <DialogTrigger className="absolute flex items-center justify-center p-0 bg-white rounded-full cursor-pointer right-3 bottom-4 size-11 text-cherry-red">
                  <Pen size={16} />
                </DialogTrigger>
                <EditDishDialog />
              </Dialog>
            </div>

            <div className="flex items-start justify-between mt-4">
              <h3 className="text-sm font-medium leading-5 text-cherry-red">
                Buffalo Wings
              </h3>
              <h3 className="text-xs font-normal leading-4 text-midnight-black">
                $15.99
              </h3>
            </div>

            <p className="mt-1 text-xs font-normal leading-4 text-midnight-black">
              Spicy chicken wings with celery and blue cheese
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 mt-10 bg-white">
        <h4 className="mb-4 text-xl font-semibold text-midnight-black">
          Main Dishes
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <div className="bg-white rounded-[20px] border border-dashed border-cherry-red flex flex-col justify-center items-center cursor-pointer">
                <Button className="text-white rounded-full size-11 bg-cherry-red">
                  <Plus />
                </Button>
                <p className="mt-3 text-sm font-medium leading-4 text-midnight-black">
                  Add new Dish to Main Dishes
                </p>
              </div>
            </DialogTrigger>
            <AddDishDialog />
          </Dialog>

          <div className="bg-white rounded-[20px] p-4 border border-[#E4E4E7]">
            <div className="relative">
              <img
                src="/sample-main.jpg"
                alt="Sample Main"
                className="object-cover w-full h-48 rounded-xl"
              />

              <Dialog>
                <DialogTrigger className="absolute flex items-center justify-center p-0 bg-white rounded-full cursor-pointer right-3 bottom-4 size-11 text-cherry-red">
                  <Pen size={16} />
                </DialogTrigger>
                <EditDishDialog />
              </Dialog>
            </div>

            <div className="flex items-start justify-between mt-4">
              <h3 className="text-sm font-medium leading-5 text-cherry-red">
                Grilled Salmon
              </h3>
              <h3 className="text-xs font-normal leading-4 text-midnight-black">
                $24.99
              </h3>
            </div>

            <p className="mt-1 text-xs font-normal leading-4 text-midnight-black">
              Fresh salmon with seasonal vegetables
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuGrid;
