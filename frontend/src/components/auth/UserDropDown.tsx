"use client";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link";

const UserDropdown = () => {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href="/auth/signup">
          <Button className="bg-cloude-gray text-obsidian button">
            Sign up
          </Button>
        </Link>
        <Link href="/auth/signin">
          <Button className="bg-cherry-red text-snow-white button">
            Sign in
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-cherry-red">
        <Button className="rounded-full text-snow-white size-9 button">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white flex flex-col items-center px-6 py-4 gap-1.5">
        <h4 className="text-xl font-semibold leading-7 text-midnight-black">
          {user?.email || "User"}
        </h4>
        <Button
          variant="secondary"
          className="button"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "Signing out..." : "Sign out"}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
