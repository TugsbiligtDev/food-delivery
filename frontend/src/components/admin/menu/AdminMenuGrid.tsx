"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pen, Plus, Image as ImageIcon } from "lucide-react";
import AddDishDialog from "./AddDishDialog";
import EditDishDialog from "./EditDishDialog";
import CategoryFilter from "./CategoryFilter";
import { Food, Category } from "@/lib/types";
import { getAllFoods, getAllCategories } from "@/lib/api/foods";
import { deleteFood } from "@/lib/api/admin";
import { toast } from "sonner";
import Image from "next/image";

const AdminMenuGrid = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [openDialogs, setOpenDialogs] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [foodsData, categoriesData] = await Promise.all([
          getAllFoods(),
          getAllCategories(),
        ]);
        setFoods(foodsData);
        setCategories(categoriesData);
      } catch {
        toast.error("Failed to load menu data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFoodAdded = (newFood: Food) => {
    setFoods((prev) => [...prev, newFood]);
    toast.success("Food item added successfully");
  };

  const handleCategoryAdded = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
    toast.success("Category added successfully");
  };

  const handleCategoryDeleted = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
  };

  const handleFoodUpdated = (updatedFood: Food) => {
    setFoods((prev) =>
      prev.map((food) => (food._id === updatedFood._id ? updatedFood : food))
    );
    toast.success("Food item updated successfully");
  };

  const handleFoodDeleted = async (foodId: string) => {
    try {
      await deleteFood(foodId);
      setFoods((prev) => prev.filter((food) => food._id !== foodId));
      toast.success("Food item deleted successfully");
    } catch {
      toast.error("Failed to delete food item");
    }
  };

  const handleImageError = (foodId: string) => {
    setImageErrors((prev) => new Set(prev).add(foodId));
  };

  const toggleDialog = (categoryId: string, isOpen: boolean) => {
    setOpenDialogs((prev) => {
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.add(categoryId);
      } else {
        newSet.delete(categoryId);
      }
      return newSet;
    });
  };

  const groupFoodsByCategory = () => {
    return foods.reduce((grouped, food) => {
      const categoryName = food.category.categoryName;
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(food);
      return grouped;
    }, {} as { [key: string]: Food[] });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Loading menu...</div>
      </div>
    );
  }

  const groupedFoods = groupFoodsByCategory();

  return (
    <div>
      <CategoryFilter
        onCategoryAdded={handleCategoryAdded}
        onCategoryDeleted={handleCategoryDeleted}
        foods={foods}
      />
      {categories.map((category) => {
        const categoryFoods = groupedFoods[category.categoryName] || [];
        const isDialogOpen = openDialogs.has(category._id);

        return (
          <div key={category._id} className="p-5 mt-10 bg-white min-h-[300px]">
            <h4 className="mb-4 text-xl font-semibold text-midnight-black">
              {category.categoryName}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => toggleDialog(category._id, open)}
              >
                <DialogTrigger asChild>
                  <div className="bg-white rounded-[20px] border border-dashed border-cherry-red flex flex-col justify-center items-center cursor-pointer min-h-[200px]">
                    <Button className="text-white rounded-full size-11 bg-cherry-red">
                      <Plus />
                    </Button>
                    <p className="mt-3 text-sm font-medium leading-4 text-midnight-black text-center px-4">
                      Add new Dish to {category.categoryName}
                    </p>
                  </div>
                </DialogTrigger>
                <AddDishDialog
                  category={category}
                  onFoodAdded={(newFood) => {
                    handleFoodAdded(newFood);
                    toggleDialog(category._id, false);
                  }}
                />
              </Dialog>

              {categoryFoods.map((food) => (
                <div
                  key={food._id}
                  className="bg-white rounded-[20px] p-4 border border-[#E4E4E7] relative"
                >
                  <div className="relative">
                    {imageErrors.has(food._id) || !food.image ? (
                      <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No image</p>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={food.image}
                        alt={food.foodName}
                        width={300}
                        height={192}
                        className="object-cover w-full h-48 rounded-xl"
                        loading="lazy"
                        onError={() => handleImageError(food._id)}
                      />
                    )}

                    <div className="absolute bottom-3 right-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-white text-cherry-red hover:bg-gray-50 rounded-full w-8 h-8 p-0 shadow-sm"
                            onClick={() => setSelectedFood(food)}
                          >
                            <Pen size={16} />
                          </Button>
                        </DialogTrigger>
                        <EditDishDialog
                          food={selectedFood!}
                          categories={categories}
                          onFoodUpdated={handleFoodUpdated}
                          onFoodDeleted={handleFoodDeleted}
                        />
                      </Dialog>
                    </div>
                  </div>

                  <div className="flex items-start justify-between mt-4">
                    <h3 className="text-sm font-medium leading-5 text-cherry-red">
                      {food.foodName}
                    </h3>
                    <h3 className="text-xs font-normal leading-4 text-midnight-black">
                      ${food.price.toFixed(2)}
                    </h3>
                  </div>

                  <p className="mt-1 text-xs font-normal leading-4 text-midnight-black">
                    {food.ingredients}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {categories.length === 0 && (
        <div className="p-5 mt-10 bg-white text-center">
          <p className="text-gray-600">
            No categories found. Add some categories to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminMenuGrid;
