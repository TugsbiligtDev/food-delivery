"use client";
import { Truck, LogOut, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AdminSidebarProps {
  activeSection: "menu" | "orders";
  onSectionChange: (section: "menu" | "orders") => void;
}

const AdminSidebar = ({
  activeSection,
  onSectionChange,
}: AdminSidebarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/signin");
  };

  return (
    <div className="flex flex-col items-center w-full h-screen max-w-xs gap-8 px-5 bg-white">
      <div className="flex gap-3 mt-6">
        <Image
          src="/logo.png"
          alt="NomNom Logo"
          width={46}
          height={46}
          className="w-[46px]"
        />
        <div>
          <h4 className="text-xl font-semibold leading-7 text-midnight-black">
            Nom Nom
          </h4>
          <p className="text-xs font-normal leading-4 text-slate-gray">
            Admin Panel
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Button
          variant={activeSection === "menu" ? "default" : "outline"}
          className={`w-full justify-center items-center gap-2.5 flex py-2.5 px-6 rounded-full transition-all duration-200 ${
            activeSection === "menu"
              ? "bg-obsidian text-white shadow-md"
              : "bg-white text-midnight-black border border-light-gray hover:bg-light-gray"
          }`}
          onClick={() => onSectionChange("menu")}
        >
          <Utensils />
          Menu Management
        </Button>

        <Button
          variant={activeSection === "orders" ? "default" : "outline"}
          className={`w-full justify-center items-center gap-2.5 flex py-2.5 px-6 rounded-full transition-all duration-200 ${
            activeSection === "orders"
              ? "bg-obsidian text-white shadow-md"
              : "bg-white text-midnight-black border border-light-gray hover:bg-light-gray"
          }`}
          onClick={() => onSectionChange("orders")}
        >
          <Truck />
          Orders Management
        </Button>
      </div>

      <div className="mt-auto mb-6">
        <Button
          variant="outline"
          className="w-full justify-center items-center gap-2.5 flex py-2.5 px-6 rounded-full transition-all duration-200 bg-white text-red-600 border border-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
