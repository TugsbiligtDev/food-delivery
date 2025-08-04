import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import CategoryFilter from "@/components/admin/menu/CategoryFilter";
import AdminMenuGrid from "@/components/admin/menu/AdminMenuGrid";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {/* Menu Management Section */}
        <section className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-midnight-black mb-2">
              Menu Management
            </h1>
            <p className="text-slate-gray">
              Manage your restaurant menu items and categories
            </p>
          </div>
          <CategoryFilter />
          <AdminMenuGrid />
        </section>

        {/* Orders Section */}
        <section className="p-6 border-t border-light-gray">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-midnight-black mb-2">
              Orders Management
            </h1>
            <p className="text-slate-gray">View and manage customer orders</p>
          </div>
          <OrdersTable />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
