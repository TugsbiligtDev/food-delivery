"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Image, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ValidationMsg from "@/components/auth/ValidationMsg";
import { Food, Category } from "@/lib/types";
import { updateFood, deleteFood } from "@/lib/api/admin";
import { toast } from "sonner";
import NextImage from "next/image";

const foodSchema = z.object({
  foodName: z.string().min(1, "Food name is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  ingredients: z.string().min(1, "Ingredients are required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Valid image URL is required"),
});

type FoodFormData = z.infer<typeof foodSchema>;

interface EditDishDialogProps {
  food: Food;
  categories: Category[];
  onFoodUpdated: (food: Food) => void;
  onFoodDeleted: (foodId: string) => void;
}

const EditDishDialog = ({
  food,
  categories,
  onFoodUpdated,
  onFoodDeleted,
}: EditDishDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(food?.image || "");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FoodFormData>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      foodName: food?.foodName || "",
      price: food?.price || 0,
      ingredients: food?.ingredients || "",
      category: food?.category?._id || "",
      image: food?.image || "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
    setValue("image", previewUrl);
  };

  const onSubmit = async (data: FoodFormData) => {
    setIsLoading(true);
    try {
      const updatedFood = await updateFood(food._id, data);
      onFoodUpdated(updatedFood);
      toast.success("Food item updated successfully!");
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to update food item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this food item?")) return;

    setIsLoading(true);
    try {
      await deleteFood(food._id);
      onFoodDeleted(food._id);
      toast.success("Food item deleted successfully!");
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to delete food item");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (food) {
      reset({
        foodName: food.foodName || "",
        price: food.price || 0,
        ingredients: food.ingredients || "",
        category: food.category?._id || "",
        image: food.image || "",
      });
      setImageUrl(food.image || "");
    }
  }, [food, reset]);

  useEffect(() => {
    return () => {
      if (
        imageUrl &&
        imageUrl.startsWith("blob:") &&
        imageUrl !== food?.image
      ) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, food?.image]);

  return (
    <DialogContent className="max-w-xl bg-white text-midnight-black">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold leading-7">
          Dishes info
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="form-label">Dish name</Label>
          <Input
            {...register("foodName")}
            type="text"
            placeholder="Enter dish name"
          />
          <ValidationMsg message={errors.foodName?.message || ""} />
        </div>

        <div>
          <Label className="form-label">Dish category</Label>
          <Select
            onValueChange={(value) => setValue("category", value)}
            defaultValue={food?.category?._id || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ValidationMsg message={errors.category?.message || ""} />
        </div>

        <div>
          <Label className="form-label">Ingredients</Label>
          <Textarea
            {...register("ingredients")}
            placeholder="Enter ingredients"
          />
          <ValidationMsg message={errors.ingredients?.message || ""} />
        </div>

        <div>
          <Label className="form-label">Price</Label>
          <Input
            {...register("price", { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="0.00"
          />
          <ValidationMsg message={errors.price?.message || ""} />
        </div>

        <div>
          <Label className="form-label">Image</Label>
          {imageUrl ? (
            <div className="relative">
              <NextImage
                src={imageUrl}
                alt="Food preview"
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  if (imageUrl && imageUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(imageUrl);
                  }
                  setImageUrl("");
                  setValue("image", "");
                }}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full border border-dashed border-blue-200 flex flex-col justify-center items-center bg-blue-50 px-4 py-10 gap-2 rounded-md min-h-[200px] cursor-pointer transition-colors hover:border-blue-400">
                <Image
                  className="text-gray-400"
                  size={32}
                  aria-label="Upload icon"
                />
                <p className="text-gray-600">
                  Choose a file or drag & drop it here
                </p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
          )}
          <ValidationMsg message={errors.image?.message || ""} />
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button
            type="button"
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash size={16} />
          </Button>
          <Button
            type="submit"
            className="bg-midnight-black text-snow-white w-fit disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default EditDishDialog;
