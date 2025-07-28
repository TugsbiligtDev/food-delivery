import { Soup, Timer, Map } from "lucide-react";
import { Badge } from "../../ui/badge";

interface OrderItemProps {
  id: string;
  totalPrice: number;
  status: "Pending" | "Preparing" | "On the way" | "Delivered" | "Cancelled";
  items: Array<{ name: string; quantity: number }>;
  orderDate: string;
  deliveryAddress: string;
}

const OrderItem = ({
  id,
  totalPrice,
  status,
  items,
  orderDate,
  deliveryAddress,
}: OrderItemProps) => {
  return (
    <div className="p-4 space-y-3 bg-white border border-gray-100 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-bold text-midnight-black">
            ${totalPrice.toFixed(2)}
          </h4>
          <span className="text-xs text-slate-gray">Order {id}</span>
        </div>
        <Badge
          variant="outline"
          className="py-1 px-2.5 text-xs font-semibold text-black border rounded-full border-cherry-red"
        >
          {status}
        </Badge>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-gray">
              <Soup className="flex-shrink-0 size-4" />
              <p className="truncate">{item.name}</p>
            </div>
            <p className="flex-shrink-0 text-sm font-medium text-midnight-black">
              x {item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm text-slate-gray">
        <div className="flex items-center gap-2">
          <Timer className="flex-shrink-0 size-4" />
          <p>{orderDate}</p>
        </div>

        <div className="flex items-start gap-2">
          <Map className="size-4 flex-shrink-0 mt-0.5" />
          <p className="leading-5 line-clamp-2">{deliveryAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
