import { Button } from "../ui/button";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/app/contexts/UseCart";
interface MenuCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const MenuCard = ({ id, title, price, description, image }: MenuCardProps) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const isAdded = isInCart(id);
  const quantity = getItemQuantity(id);

  const handleAddToCart = () => {
    if (isAdded) {
      // If already in cart, add another one
      addToCart({ id, name: title, price, image, description });
    } else {
      // First time adding
      addToCart({ id, name: title, price, image, description });
    }
  };

  return (
    <div className="bg-white rounded-[20px] px-4 py-4">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-xl"
        />

        <Button
          onClick={handleAddToCart}
          className={`absolute bottom-3 right-3 rounded-full size-11 p-0 ${
            isAdded ? "bg-obsidian" : "bg-cherry-red"
          } text-white`}
          aria-label={`Add ${title} to cart`}
        >
          {isAdded ? (
            <div className="size-11 bg-black rounded-full flex items-center justify-center">
              <Check size={16} />
            </div>
          ) : (
            <Plus size={16} />
          )}
        </Button>
      </div>

      <div className="flex justify-between items-start mt-4">
        <h3 className="text-2xl font-semibold leading-8 text-cherry-red">
          {title}
        </h3>
        <h3 className="text-lg font-semibold leading-8 text-midnight-black">
          ${price.toFixed(2)}
        </h3>
      </div>

      <p className="mt-1 text-sm font-normal leading-5 text-midnight-black">
        {description}
      </p>
    </div>
  );
};

export default MenuCard;
