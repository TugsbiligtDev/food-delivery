"use client";
import { Button } from "@/components/ui/button";
import {
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
import { Image, Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import ValidationMsg from "@/components/auth/ValidationMsg";

const AddDishDialog = () => {
  return (
    <DialogContent className="max-w-xl bg-white text-midnight-black">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold leading-7">
          Add new Dish
        </DialogTitle>
      </DialogHeader>

      <form className="space-y-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <Label className="form-label">Food name</Label>
            <Input type="text" />
            <ValidationMsg message="" />
          </div>
          <div className="flex-1">
            <Label className="form-label">Food price</Label>
            <Input type="number" step="0.01" />
            <ValidationMsg message="" />
          </div>
        </div>

        <div>
          <Label className="form-label">Ingredients</Label>
          <Textarea />
          <ValidationMsg message="" />
        </div>

        <div>
          <Label className="form-label">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="appetizers">Appetizers</SelectItem>
              <SelectItem value="main-dishes">Main Dishes</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
            </SelectContent>
          </Select>
          <ValidationMsg message="" />
        </div>

        <div>
          <Label className="form-label">Food Image</Label>
          <div className="w-full border border-dashed border-blue-200 flex flex-col justify-center items-center bg-blue-50 px-4 py-10 gap-2 rounded-md min-h-[200px] cursor-pointer transition-colors hover:border-blue-400">
            <Image className="text-gray-400" size={32} />
            <p className="text-gray-600">
              Choose a file or drag & drop it here
            </p>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>

        <Button
          type="submit"
          className="bg-midnight-black text-snow-white w-fit disabled:opacity-50"
        >
          Add Dish
        </Button>
      </form>
    </DialogContent>
  );
};

export default AddDishDialog;
