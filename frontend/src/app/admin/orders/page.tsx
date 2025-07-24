import OrdersTable from "@/components/adminOrders/OrdersTable";
import React from "react";

const Page = () => {
  return (
    <div className="bg-white text-black h-screen ">
      <div className="w-[80%] mx-auto">
        <OrdersTable />
      </div>
    </div>
  );
};

export default Page;
