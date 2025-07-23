import React from "react";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

const AdminAddCard = () => {
  return (
    <div className="bg-white rounded-[20px] p-4 border border-[#E4E4E7]">
      <div className="relative">
        <img
          src="/cardImage.png"
          alt="image"
          className="w-full h-48 object-cover rounded-xl"
        />

        <Button className="absolute bottom-3 right-3 rounded-full size-11 p-0 bg-white text-cherry-red">
          <Pen />
        </Button>
      </div>

      <div className="flex justify-between items-start mt-4">
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

export default AdminAddCard;
