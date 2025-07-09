import { Soup, Timer, MapPinHouse } from "lucide-react";
import { Badge } from "../ui/badge";

const OrderItem = () => {
  return (
    <div>
      {/* Price & Status */}
      <div className="flex justify-between">
        <h4 className="font-bold text-base text-midnight-black">$26.97</h4>
        <Badge className="font-semibold text-xs bg-cloude-gray text-midnight-black rounded-full">
          Pending
        </Badge>
      </div>
      {/* Orders */}
      <div className="flex justify-between items-center">
        <div className="flex text-slate-gray text-xs gap-1">
          <Soup className="size-3" />
          <p>Sunshine Stackers </p>
        </div>
        <p className="text-xs text-midnight-black">x 1</p>
      </div>
      <div className="text-slate-gray text-xs">
        <div className="flex gap-1">
          <Timer className="size-3" />
          <p>2024/12/20</p>
        </div>
        <div className="flex gap-1">
          <MapPinHouse className="size-3" />
          <p className="text-nowrap overflow-hidden overflow-ellipsis">
            2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg |
            100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД
            нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд
            талд 4д ногоон20
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
