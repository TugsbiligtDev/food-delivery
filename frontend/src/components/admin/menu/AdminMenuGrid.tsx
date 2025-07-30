"use client";
import axios from "axios";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pen, Plus } from "lucide-react";
import AddDishDialog from "./AddDishDialog";
import { useEffect, useState } from "react";
import EditDishDialog from "./EditDishDialog";

interface Category {
  _id: string;
  categoryName: string;
}

interface FoodItem {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients?: string[];
  category: Category;
}

interface ApiResponse {
  data: FoodItem[];
}

const AdminMenuGrid = () => {
  const [food, setFood] = useState<FoodItem[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://localhost:8000/api/foods"
      );
      console.log("API response received:", response.data.data.length, "items");

      setFood(response.data.data);
      console.log("test", response.data.data);
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const groupedFood = food.reduce((acc, item) => {
    const categoryId = item.category._id;
    if (!acc[categoryId]) {
      acc[categoryId] = {
        category: item.category,
        items: [],
      };
    }
    acc[categoryId].items.push(item);
    return acc;
  }, {} as Record<string, { category: Category; items: FoodItem[] }>);

  return (
    <div>
      {Object.values(groupedFood).map(({ category, items }) => (
        <div key={category._id} className="p-5 mt-10 bg-white">
          <h4 className="mb-4 text-xl font-semibold text-midnight-black">
            {category.categoryName}
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-white rounded-[20px] border border-dashed border-cherry-red flex flex-col justify-center items-center cursor-pointer">
                  <Button className="text-white rounded-full size-11 bg-cherry-red">
                    <Plus />
                  </Button>
                  <p className="mt-3 text-sm font-medium leading-4 text-midnight-black">
                    Add new Dish to {category.categoryName}
                  </p>
                </div>
              </DialogTrigger>
              <AddDishDialog />
            </Dialog>

            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-[20px] p-4 border border-[#E4E4E7]"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.foodName}
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
                    {item.foodName}
                  </h3>
                  <h3 className="text-xs font-normal leading-4 text-midnight-black">
                    ${item.price}
                  </h3>
                </div>

                <p className="mt-1 text-xs font-normal leading-4 text-midnight-black">
                  {item.ingredients}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMenuGrid;
