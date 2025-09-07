"use client";
import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import AdminMenuGrid from "@/components/admin/menu/AdminMenuGrid";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<"menu" | "orders">("menu");

  const renderContent = () => {
    switch (activeSection) {
      case "menu":
        return (
          <div className="bg-white rounded-lg m-6 p-6">
            <AdminMenuGrid />
          </div>
        );
      case "orders":
        return (
          <div className="bg-white rounded-lg m-6 p-6">
            <OrdersTable />
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg m-6 p-6">
            <AdminMenuGrid />
          </div>
        );
    }
  };

  return (
    <AdminGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </AdminGuard>
  );
};

export default AdminPage;
