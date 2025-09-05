"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image, Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import ValidationMsg from "@/components/auth/ValidationMsg";
import { Category } from "@/lib/types";
import { createFood } from "@/lib/api/admin";
import { uploadImage } from "@/lib/cloudinary";
import { toast } from "sonner";

const foodSchema = z.object({
  foodName: z.string().min(1, "Food name is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  ingredients: z.string().min(1, "Ingredients are required"),
  image: z.string().min(1, "Image is required"),
});

type FoodFormData = z.infer<typeof foodSchema>;

interface AddDishDialogProps {
  category: Category;
  onFoodAdded: (food: any) => void;
}

const AddDishDialog = ({ category, onFoodAdded }: AddDishDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FoodFormData>({
    resolver: zodResolver(foodSchema),
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      // Upload to Cloudinary
      const cloudinaryUrl = await uploadImage(file);
      setImageUrl(cloudinaryUrl);
      setValue("image", cloudinaryUrl);
      toast.success("Image uploaded successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    return () => {
      // No need to revoke blob URLs since we're using Cloudinary URLs
    };
  }, []);

  const onSubmit = async (data: FoodFormData) => {
    setIsLoading(true);
    try {
      const foodData = {
        ...data,
        category: category._id,
      };
      const newFood = await createFood(foodData);
      onFoodAdded(newFood);
      reset();
      setImageUrl("");
    } catch (error: any) {
      toast.error(error.message || "Failed to add food item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="max-w-xl bg-white text-midnight-black">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold leading-7">
          Add new Dish to {category.categoryName}
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <Label className="form-label">Food name</Label>
            <Input
              {...register("foodName")}
              type="text"
              placeholder="Enter food name"
            />
            <ValidationMsg message={errors.foodName?.message || ""} />
          </div>
          <div className="flex-1">
            <Label className="form-label">Food price</Label>
            <Input
              {...register("price", { valueAsNumber: true })}
              type="number"
              step="0.01"
              placeholder="0.00"
            />
            <ValidationMsg message={errors.price?.message || ""} />
          </div>
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
          <Label className="form-label">Food Image</Label>
          {imageUrl ? (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Food preview"
                className="w-full h-48 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
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
                disabled={uploadingImage}
              />
              <div className="w-full border border-dashed border-blue-200 flex flex-col justify-center items-center bg-blue-50 px-4 py-10 gap-2 rounded-md min-h-[200px] cursor-pointer transition-colors hover:border-blue-400">
                {uploadingImage ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-gray-600">Uploading image...</p>
                  </div>
                ) : (
                  <>
                    <Image className="text-gray-400" size={32} />
                    <p className="text-gray-600">
                      Choose a file or drag & drop it here
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </>
                )}
              </div>
            </div>
          )}
          <ValidationMsg message={errors.image?.message || ""} />
        </div>

        <Button
          type="submit"
          className="bg-midnight-black text-snow-white w-fit disabled:opacity-50"
          disabled={isLoading || uploadingImage}
        >
          {isLoading ? "Adding..." : "Add Dish"}
        </Button>
      </form>
    </DialogContent>
  );
};

export default AddDishDialog;
