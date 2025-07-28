import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Image, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

interface Category {
  _id: string;
  categoryName: string;
  count: number;
}

interface ApiResponse {
  data: Category[];
}

const EditDishDialog = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(
        "http://localhost:8000/api/categories"
      );
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <DialogContent className="max-w-xl bg-white text-midnight-black">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold leading-7">
          Dish info
        </DialogTitle>
      </DialogHeader>
      <div className="flex-between">
        <Label className="form-label">Food name</Label>
        <Input />
      </div>
      <div className="flex-between">
        <Label className="form-label">Dish category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue
              placeholder={loading ? "Loading..." : "Select a category..."}
            />
          </SelectTrigger>
          <SelectContent>
            {loading ? (
              <SelectItem value="loading" disabled>
                Loading categories...
              </SelectItem>
            ) : categories.length === 0 ? (
              <SelectItem value="no-categories" disabled>
                No categories found
              </SelectItem>
            ) : (
              categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.categoryName}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-between">
        <Label className="form-label">Ingredients</Label>
        <Textarea />
      </div>
      <div className="flex-between">
        <Label className="form-label">Price</Label>
        <Input type="number" />
      </div>
      <div className="flex-between">
        <Label className="form-label">Food Image</Label>
        <div className="w-full border border-dashed border-[#2563EB33] flex flex-col justify-center items-center bg-[#2563EB0D] px-4 py-10 gap-2 rounded-md  min-h-[200px]">
          <Image />
          <p>Choose a file or drag & drop it here</p>
        </div>
      </div>
      <div className="flex-between">
        <Button
          variant="outline"
          className="flex-shrink-0 p-0 border text-cherry-red border-cherry-red size-8 pointer "
        >
          <Trash size={14} />
        </Button>
        <DialogClose asChild>
          <Button className="bg-midnight-black text-snow-white pointer w-fit">
            Add Dish
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default EditDishDialog;
