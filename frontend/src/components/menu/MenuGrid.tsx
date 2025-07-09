import MenuCard from "./MenuCard";

const MenuGrid = () => {
  return (
    <section className="my-15">
      <h2 className="font-semibold text-3xl leading-9 mb-8">Appetizers</h2>
      <div className="grid grid-cols-3 gap-10">
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
