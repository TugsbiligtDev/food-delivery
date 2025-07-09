"use client";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="bg-cherry-red hover:cursor-pointer"
      >
        <Button className="rounded-full text-snow-white size-9">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white flex flex-col items-center px-6 py-4 gap-1.5">
        <h4 className="text-xl font-semibold leading-7 text-midnight-black">
          User@gmail.com
        </h4>
        <Button className="text-obsidian bg-cloude-gray button">
          Sign out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
