import { Soup, Timer, Map } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Order } from "@/lib/types";

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "border-yellow-500 text-yellow-600";
      case "PREPARING":
        return "border-blue-500 text-blue-600";
      case "DELIVERED":
        return "border-green-500 text-green-600";
      case "CANCELED":
        return "border-red-500 text-red-600";
      default:
        return "border-gray-500 text-gray-600";
    }
  };

  return (
    <div className="p-4 space-y-3 bg-white border border-gray-100 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-bold text-midnight-black">
            ${order.totalPrice.toFixed(2)}
          </h4>
          <span className="text-xs text-slate-gray">
            Order #{order._id.slice(-6)}
          </span>
        </div>
        <Badge
          variant="outline"
          className={`py-1 px-2.5 text-xs font-semibold border rounded-full ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </Badge>
      </div>

      <div className="space-y-2">
        {order.foodOrderItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm text-slate-gray"
          >
            <div className="flex items-center gap-2">
              <Soup className="flex-shrink-0 size-4" />
              <p className="truncate">{item.food.foodName}</p>
            </div>
            <span className="text-xs font-medium text-midnight-black">
              x {item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm text-slate-gray">
        <div className="flex items-center gap-2">
          <Timer className="flex-shrink-0 size-4" />
          <p>{formatDate(order.createdAt)}</p>
        </div>

        <div className="flex items-start gap-2">
          <Map className="size-4 flex-shrink-0 mt-0.5" />
          <p className="leading-5 line-clamp-2">{order.deliveryAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
