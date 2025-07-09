import { LayoutDashboard, Truck } from "lucide-react";
import Link from "next/link";

const AdminSidebar = () => {
  return (
    <div className="bg-white h-screen w-full max-w-xs flex flex-col items-center gap-8 px-5">
      <div className="flex gap-3 mt-6 border">
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
      <Link
        href="/admin/menu"
        className="w-full justify-center items-center gap-2.5 not-odd:rounded-full text-black flex border py-2 px-6"
      >
        <LayoutDashboard />
        Menu
      </Link>
      <Link
        href="/admin/orders"
        className="w-full justify-center items-center gap-2.5 rounded-full text-black flex border py-2 px-6"
      >
        <Truck />
        Orders
      </Link>
    </div>
  );
};

export default AdminSidebar;
