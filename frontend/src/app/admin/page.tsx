"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Utensils, Truck } from "lucide-react";
import AdminMenuGrid from "@/components/admin/menu/AdminMenuGrid";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { Category } from "@/lib/types";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "menu" | "orders"
  >("menu");

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
          <section className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-midnight-black mb-2">
                Admin Dashboard
              </h1>
              <p className="text-slate-gray">
                Welcome to your restaurant management dashboard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveSection("menu")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    Menu Management
                  </CardTitle>
                  <CardDescription>
                    Manage your restaurant menu items and categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-gray">
                    Add, edit, and organize your menu items and categories
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveSection("orders")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Orders Management
                  </CardTitle>
                  <CardDescription>
                    View and manage customer orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-gray">
                    Track order status, update delivery information
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
