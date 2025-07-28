"use client";
import MenuCard from "./MenuCard";

const menuItems = [
  {
    id: 1,
    title: "Crispy Spring Rolls",
    price: 8.99,
    description:
      "Fresh vegetables wrapped in crispy pastry, served with sweet chili sauce.",
    image:
      "https://vegconomist.com/wp-content/uploads/sites/3/Ohayo-Valley.jpg",
  },
  {
    id: 2,
    title: "Buffalo Wings",
    price: 12.99,
    description:
      "Spicy chicken wings tossed in buffalo sauce with celery and blue cheese.",
    image:
      "https://vegconomist.com/wp-content/uploads/sites/3/Ohayo-Valley.jpg",
  },
  {
    id: 3,
    title: "Loaded Nachos",
    price: 10.99,
    description:
      "Tortilla chips topped with cheese, jalapeños, sour cream, and guacamole.",
    image:
      "https://vegconomist.com/wp-content/uploads/sites/3/Ohayo-Valley.jpg",
  },
  {
    id: 4,
    title: "Mozzarella Sticks",
    price: 9.99,
    description:
      "Golden fried mozzarella cheese sticks served with marinara sauce.",
    image:
      "https://vegconomist.com/wp-content/uploads/sites/3/Ohayo-Valley.jpg",
  },
  {
    id: 5,
    title: "Garlic Bread",
    price: 6.99,
    description:
      "Toasted bread with garlic butter and herbs, perfect for sharing.",
    image:
      "https://vegconomist.com/wp-content/uploads/sites/3/Ohayo-Valley.jpg",
  },
  {
    id: 6,
    title: "Calamari Rings",
    price: 13.99,
    description:
      "Tender squid rings lightly battered and fried, served with lemon.",
    image:
      "https://vegconomist.com/wp-content/uploads/sites/3/Ohayo-Valley.jpg",
  },
  {
    id: 7,
    title: "Stuffed Mushrooms",
    price: 11.99,
    description:
      "Button mushrooms stuffed with cream cheese, herbs and breadcrumbs.",
    image:
      "https://vegconomist.com/wp-content/uploads/sites/3/Ohayo-Valley.jpg",
  },
  {
    id: 8,
    title: "Bruschetta",
    price: 7.99,
    description:
      "Toasted bread topped with fresh tomatoes, basil, and balsamic glaze.",
    image:
      "https://vegconomist.com/wp-content/uploads/sites/3/Ohayo-Valley.jpg",
  },
];

const MenuGrid = () => {
  return (
    <section className="my-15">
      <h2 className="mb-8 text-3xl font-semibold leading-9">Appetizers</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-9">
        {menuItems.map((item) => (
          <MenuCard
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuGrid;
