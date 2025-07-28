import { Plus } from "lucide-react";
import { useCart } from "@/app/contexts/UseCart";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MenuItemDialog from "./MenuItemDialog";

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

  const handleQuickAdd = () => {
    addToCart({
      id,
      name: title,
      price,
      description,
      image,
    });
  };
  return (
    <Card className="bg-white rounded-[20px]">
      <CardContent>
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-48 rounded-xl"
          />
          <Dialog>
            <DialogTrigger className="absolute flex items-center justify-center p-0 bg-white rounded-full bottom-3 right-3 text-cherry-red size-11">
              <Plus size={16} strokeWidth={3} />
            </DialogTrigger>
            <MenuItemDialog
              id={id}
              title={title}
              price={price}
              description={description}
              image={image}
            />
          </Dialog>
        </div>
        <CardTitle className="flex items-start justify-between mt-2">
          <h3 className="text-2xl font-semibold leading-8 text-cherry-red">
            {title}
          </h3>
          <h3 className="text-lg font-semibold leading-8 text-midnight-black">
            ${price.toFixed(2)}
          </h3>
        </CardTitle>
        <CardDescription className="mt-1 text-sm font-normal leading-5 text-midnight-black">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default MenuCard;

//todo menu ruugee add hiideg boloh
