"use client";
import MenuCard from "./MenuCard";

const MenuGrid = () => {
  return (
    <section className="my-15">
      <h2 className="mb-8 text-3xl font-semibold leading-9">Appetizers</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-9">
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
      </div>
    </section>
  );
};

export default MenuGrid;
