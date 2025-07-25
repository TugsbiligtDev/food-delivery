"use client";
import { Button } from "../ui/button";
import { CheckIcon, ChevronsUpDownIcon, Image, Pen, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
const AdminAddCard = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="bg-white rounded-[20px] p-4 border border-[#E4E4E7]">
      <div className="relative">
        <img
          src="/cardImage.png"
          alt="image"
          className="w-full h-48 object-cover rounded-xl"
        />

        <Dialog>
          <DialogTrigger className="absolute right-3 bottom-4 rounded-full size-11 p-0 bg-white text-cherry-red flex justify-center items-center">
            <Pen size={16} />
          </DialogTrigger>
          <DialogContent className="bg-white text-midnight-black">
            <DialogHeader>
              <DialogTitle className="font-semibold text-lg leading-7">
                Dish info
              </DialogTitle>
            </DialogHeader>
            <div className="flex-between">
              <Label className="form-label">Food name</Label> <Input />
            </div>
            <div className="flex-between">
              <Label className="form-label">Dish category</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : "Select a category..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    {/* <CommandInput placeholder="Choose category..." /> */}
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup className="bg-white text-black">
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            {/* <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            /> */}
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-between">
              <Label className="form-label">Ingredients</Label> <Textarea />
            </div>
            <div className="flex-between">
              <Label className="form-label">Category</Label> <Input />
            </div>
            <div className="flex-between">
              <Label className="form-label">Food Image</Label>
              <div className="w-full border border-dashed border-[#2563EB33] flex flex-col justify-center items-center bg-[#2563EB0D] px-4 py-10 gap-2 rounded-md  min-h-[200px]">
                <Image />
                <p>Choose a file or drag & drop it here</p>
              </div>
            </div>
            <div className="flex-between">
              <Button className="flex-shrink-0 text-cherry-red border-cherry-red size-8 p-0 pointer border ">
                <Trash size={14} />
              </Button>
              <Button className="bg-midnight-black text-snow-white pointer w-fit">
                Add Dish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-start mt-4">
        <h3 className="text-sm font-medium leading-5 text-cherry-red">
          Brie Crostini Appetizer
        </h3>
        <h3 className="text-xs font-normal leading-4 text-midnight-black">
          $12.99
        </h3>
      </div>

      <p className="mt-1 text-xs font-normal leading-4 text-midnight-black">
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </p>
    </div>
  );
};

export default AdminAddCard;
