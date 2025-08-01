"use client";
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

const CategoryFilter = () => {
  return (
    <div className="p-6 bg-white">
      <h4 className="mb-4 text-xl font-semibold text-midnight-black">
        Dishes category
      </h4>
      <div className="space-x-3">
        <Button
          variant="outline"
          className="rounded-full font-medium text-sm text-obsidian border border-[#E4E4E7] focus:border-cherry-red"
        >
          Appetizers
          <Badge className="bg-obsidian py-0.5 px-2.5 text-snow-white rounded-full">
            8
          </Badge>
        </Button>

        <Button
          variant="outline"
          className="rounded-full font-medium text-sm text-obsidian border border-[#E4E4E7] focus:border-cherry-red"
        >
          Main Dishes
          <Badge className="bg-obsidian py-0.5 px-2.5 text-snow-white rounded-full">
            12
          </Badge>
        </Button>

        <Button
          variant="outline"
          className="rounded-full font-medium text-sm text-obsidian border border-[#E4E4E7] focus:border-cherry-red"
        >
          Desserts
          <Badge className="bg-obsidian py-0.5 px-2.5 text-snow-white rounded-full">
            6
          </Badge>
        </Button>

        <Button
          variant="outline"
          className="rounded-full font-medium text-sm text-obsidian border border-[#E4E4E7] focus:border-cherry-red"
        >
          Beverages
          <Badge className="bg-obsidian py-0.5 px-2.5 text-snow-white rounded-full">
            4
          </Badge>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-cherry-red size-9">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-white h-60 text-midnight-black">
            <form>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold leading-7">
                  Add new Category
                </DialogTitle>
              </DialogHeader>
              <div>
                <Label className="form-label">Category Name</Label>
                <Input type="text" />
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
