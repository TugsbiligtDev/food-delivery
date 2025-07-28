"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { foodSchema, foodFormData } from "@/lib/schemas/food";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationMsg from "@/components/auth/ValidationMsg";
import { useState, useEffect } from "react";

interface Category {
  _id: string;
  categoryName: string;
  count: number;
}
const AddDishDialog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<foodFormData>({ resolver: zodResolver(foodSchema) });

  console.log("Form errors:", errors);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onSubmit = async (data: foodFormData) => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/foods",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Food added successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error adding food:", error);
      alert("Failed to add food");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="max-w-xl bg-white text-midnight-black">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold leading-7">
          Add new Dish to Appetizers
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between flex-1 gap-6">
          <div className="flex-1">
            <Label className="form-label">Food name</Label>
            <Input type="text" {...register("foodName")} />
            {errors.foodName && (
              <ValidationMsg message={errors.foodName.message || ""} />
            )}
          </div>
          <div className="flex-1">
            <Label className="form-label">Food price</Label>
            <Input type="number" step="0.01" {...register("price")} />
            {errors.price && (
              <ValidationMsg message={errors.price.message || ""} />
            )}
          </div>
        </div>

        <div>
          <Label className="form-label">Ingredients</Label>
          <Textarea {...register("ingredients")} />
          {errors.ingredients && (
            <ValidationMsg message={errors.ingredients.message || ""} />
          )}
        </div>

        <div>
          <Label className="form-label">Category</Label>
          <Select onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.categoryName}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>
                  No categories available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {errors.category && (
            <ValidationMsg message={errors.category.message || ""} />
          )}
        </div>

        <div>
          <Label className="form-label">Food Image</Label>
          <div className="w-full border border-dashed border-[#2563EB33] flex flex-col justify-center items-center bg-[#2563EB0D] px-4 py-10 gap-2 rounded-md min-h-[200px]">
            <Image />
            <p>Choose a file or drag & drop it here</p>
          </div>
        </div>

        <DialogClose asChild>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-midnight-black text-snow-white pointer w-fit"
          >
            {isSubmitting ? "Adding..." : "Add Dish"}
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default AddDishDialog;
