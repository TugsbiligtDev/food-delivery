"use client";
import { LayoutDashboard, Truck } from "lucide-react";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen max-w-xs gap-8 px-5 bg-white">
      <div className="flex gap-3 mt-6">
        <img src="/logo.png" alt="logo" className="w-[46px]" />
        <div>
          <h4 className="text-xl font-semibold leading-7 text-midnight-black">
            Nom Nom
          </h4>
          <p className="text-xs font-normal leading-4 text-slate-gray">
            Swift delivery
          </p>
        </div>
      </div>

      <button className="w-full justify-center items-center gap-2.5 text-black flex border py-2.5 px-6 cursor-pointer rounded-full transition-colors">
        <LayoutDashboard />
        Menu
      </button>

      <button className="w-full justify-center items-center gap-2.5 flex border py-2.5 px-6 cursor-pointer rounded-full transition-colors bg-midnight-black text-snow-white">
        <Truck />
        Orders
      </button>
    </div>
  );
};

export default AdminSidebar;
