"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import OrdersTable from "@/components/orders/OrdersTable";

export default function OrdersPage() {
  return (
    <div className="bg-white text-black h-screen">
      <div className="w-[80%] mx-auto">
        <AdminHeader />
        <OrdersTable />
      </div>
    </div>
  );
}