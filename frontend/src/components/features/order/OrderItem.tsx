import { Soup, Timer, Map } from "lucide-react";
import { Badge } from "../../ui/badge";

const OrderItem = () => {
  return (
    <div className="p-4 space-y-3 bg-white border border-gray-100 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-bold text-midnight-black">$25.99</h4>
          <span className="text-xs text-slate-gray">Order #12345</span>
        </div>
        <Badge
          variant="outline"
          className="py-1 px-2.5 text-xs font-semibold text-black border rounded-full border-cherry-red"
        >
          Preparing
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-gray">
            <Soup className="flex-shrink-0 size-4" />
            <p className="truncate">Sample Burger</p>
          </div>
          <p className="flex-shrink-0 text-sm font-medium text-midnight-black">
            x 2
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-gray">
            <Soup className="flex-shrink-0 size-4" />
            <p className="truncate">French Fries</p>
          </div>
          <p className="flex-shrink-0 text-sm font-medium text-midnight-black">
            x 1
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-gray">
        <div className="flex items-center gap-2">
          <Timer className="flex-shrink-0 size-4" />
          <p>Jan 15, 2025 at 2:30 PM</p>
        </div>

        <div className="flex items-start gap-2">
          <Map className="size-4 flex-shrink-0 mt-0.5" />
          <p className="leading-5 line-clamp-2">
            123 Main Street, Anytown, USA 12345
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
