"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  categoryName: string;
  count: number;
}

interface CategoryFormData {
  categoryName: string;
}

const CategoryFilter = () => {
  const { register, handleSubmit, reset } = useForm<CategoryFormData>();
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (categoryData: CategoryFormData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/categories",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Category added:", response.data);
      reset();
      fetchCategories();

      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };

  return (
    <div className="p-6 bg-white">
      <h4 className="mb-4 text-xl font-semibold text-midnight-black">
        Dishes category
      </h4>
      <div className="space-x-3">
        {categories.map((category) => (
          <Button
            key={category._id}
            variant="outline"
            className="rounded-full font-medium text-sm text-obsidian border border-[#E4E4E7] focus:border-cherry-red"
          >
            {category.categoryName}
            <Badge className="bg-obsidian py-0.5 px-2.5 text-snow-white rounded-full">
              {category.count}
            </Badge>
          </Button>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-cherry-red size-9">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-white h-60 text-midnight-black">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold leading-7">
                  Add new Category
                </DialogTitle>
              </DialogHeader>
              <div>
                <Label className="form-label">Category Name</Label>
                <Input
                  type="text"
                  {...register("categoryName", { required: true })}
                />
              </div>
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="bg-midnight-black text-snow-white pointer w-fit mt-2"
                >
                  Add Category
                </Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoryFilter;
