"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import CategoryFilter from "@/components/admin/menu/CategoryFilter";
import AdminMenuGrid from "@/components/admin/menu/AdminMenuGrid";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";

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
            <OrdersTable />
          </>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
