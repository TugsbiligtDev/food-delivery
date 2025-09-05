"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
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
import ValidationMsg from "@/components/auth/ValidationMsg";
import { Category } from "@/lib/types";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "@/lib/api/admin";
import { toast } from "sonner";

const categorySchema = z.object({
  categoryName: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name too long"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFilterProps {
  onCategoryAdded?: (newCategory: Category) => void;
  onCategoryDeleted?: (categoryId: string) => void;
  foods?: any[]; // Add foods prop to calculate counts
}

const CategoryFilter = ({
  onCategoryAdded,
  onCategoryDeleted,
  foods = [],
}: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      console.log("Creating category:", data);
      const newCategory = await createCategory(data);
      console.log("Category created:", newCategory);
      setCategories((prev) => [...prev, newCategory]);
      onCategoryAdded?.(newCategory);
      reset();
      setIsDialogOpen(false);
      toast.success("Category added successfully!");
    } catch (error: any) {
      console.error("Error creating category:", error);
      toast.error(error.message || "Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (
    categoryId: string,
    categoryName: string
  ) => {
    // Check if category has foods
    const foodsInCategory = foods.filter(
      (food) => food.category._id === categoryId
    );

    if (foodsInCategory.length > 0) {
      toast.error(
        `Cannot delete category "${categoryName}" - it contains ${foodsInCategory.length} food item(s). Please remove or move the foods first.`
      );
      return;
    }

    if (
      !confirm(
        `Are you sure you want to delete the category "${categoryName}"?`
      )
    ) {
      return;
    }

    try {
      await deleteCategory(categoryId);
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
      onCategoryDeleted?.(categoryId);
      toast.success(`Category "${categoryName}" deleted successfully!`);
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error(error.message || "Failed to delete category");
    }
  };

  return (
    <div className="p-6 bg-white">
      <h4 className="mb-4 text-xl font-semibold text-midnight-black">
        Dishes category
      </h4>
      <div className="space-x-3">
        {categories.map((category) => {
          // Calculate count of foods in this category
          const foodCount = foods.filter(
            (food) => food.category._id === category._id
          ).length;

          return (
            <div key={category._id} className="relative inline-block">
              <Button
                variant="outline"
                className="rounded-full font-medium text-sm text-obsidian border border-[#E4E4E7] focus:border-cherry-red"
              >
                {category.categoryName}
                <Badge className="bg-obsidian py-0.5 px-2.5 text-snow-white rounded-full ml-2">
                  {foodCount}
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleDeleteCategory(category._id, category.categoryName)
                }
                className="absolute -top-2 -right-2 h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full bg-white border border-red-200 shadow-sm"
                title={`Delete ${category.categoryName}`}
              >
                <X size={12} />
              </Button>
            </div>
          );
        })}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-cherry-red size-9">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-white text-midnight-black p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <DialogHeader className="space-y-4">
                <DialogTitle className="text-xl font-semibold leading-7">
                  Add new Category
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-midnight-black">
                  Category Name
                </Label>
                <Input
                  {...register("categoryName")}
                  type="text"
                  placeholder="Type category name..."
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ValidationMsg message={errors.categoryName?.message || ""} />
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-midnight-black text-snow-white w-fit px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  {isLoading ? "Adding..." : "Add category"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoryFilter;
