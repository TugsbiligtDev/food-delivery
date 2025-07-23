import { Soup, Timer, MapPinHouse } from "lucide-react";
import { Badge } from "../ui/badge";

interface OrderItemProps {
  id?: string;
  totalPrice?: number;
  status?: "Pending" | "Preparing" | "On the way" | "Delivered" | "Cancelled";
  items?: Array<{ name: string; quantity: number }>;
  orderDate?: string;
  deliveryAddress?: string;
}

const OrderItem = ({
  id = "#12345",
  totalPrice = 26.97,
  status = "Pending",
  items = [{ name: "Sunshine Stackers", quantity: 1 }],
  orderDate = "2024/12/20",
  deliveryAddress = "123 Main Street, Downtown Area, City Center",
}: OrderItemProps) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-lg text-midnight-black">
            ${totalPrice.toFixed(2)}
          </h4>
          <span className="text-xs text-slate-gray">Order {id}</span>
        </div>
        <Badge className="font-semibold text-xs rounded-full border ">
          {status}
        </Badge>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-gray text-sm">
              <Soup className="size-4 flex-shrink-0" />
              <p className="truncate">{item.name}</p>
            </div>
            <p className="text-sm text-midnight-black font-medium flex-shrink-0">
              x {item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-slate-gray text-sm">
        <div className="flex items-center gap-2">
          <Timer className="size-4 flex-shrink-0" />
          <p>{orderDate}</p>
        </div>

        <div className="flex items-start gap-2">
          <MapPinHouse className="size-4 flex-shrink-0 mt-0.5" />
          <p className="line-clamp-2 leading-5">{deliveryAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
