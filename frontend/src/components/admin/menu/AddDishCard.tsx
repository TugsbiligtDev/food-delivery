"use client";
import { Pen } from "lucide-react";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import EditDishDialog from "./EditDishDialog";
import Image from "next/image";

const AddDishCard = () => {
  return (
    <div className="bg-white rounded-[20px] p-4 border border-[#E4E4E7]">
      <div className="relative">
        <Image
          src="/cardImage.png"
          alt="Dish preview image"
          width={300}
          height={192}
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
          Brie Crostini Appetizer
        </h3>
        <h3 className="text-xs font-normal leading-4 text-midnight-black">
          $12.99
        </h3>
      </div>

      <p className="mt-1 text-xs font-normal leading-4 text-midnight-black">
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </p>
    </div>
  );
};

export default AddDishCard;
