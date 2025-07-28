"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import CategoryFilter from "@/components/admin/menu/CategoryFilter";
import AdminMenuGrid from "@/components/admin/menu/AdminMenuGrid";
import OrdersHeader from "@/components/admin/orders/OrdersHeader";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState<"orders" | "menu">("menu");

  return (
    <div className="flex h-screen">
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
      <section className="flex-1 p-6 overflow-auto bg-gray-50">
        {activeView === "menu" && (
          <>
            <CategoryFilter />
            <AdminMenuGrid />
          </>
        )}
        {activeView === "orders" && (
          <>
            <OrdersHeader /> <OrdersTable />
          </>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
