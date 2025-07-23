import React from "react";

import AdminAddCard from "./AdminAddCard";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const MenuAdd = () => {
  return (
    <div className="bg-white mt-10 p-5">
      <h4 className="font-semibold text-xl text-midnight-black mb-4">
        Appetizers. (6)
      </h4>
      <div className="grid grid-cols-3 gap-4">
        {/* separate */}
        <div className="bg-white rounded-[20px]  border border-dashed border-cherry-red flex flex-col justify-center items-center">
          <Button className="rounded-full size-11 bg-cherry-red text-white">
            <Plus />
          </Button>

          <p className="mt-3 text-sm font-medium leading-4 text-midnight-black">
            Add new Dish to Appetizers
          </p>
        </div>
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
