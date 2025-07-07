import MenuCard from "./MenuCard";

const MenuGrid = () => {
  return (
    <div className="my-15">
      <h2 className="mb-8 text-3xl font-semibold leading-9">Appetizers</h2>
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
    </div>
  );
};

export default MenuGrid;
