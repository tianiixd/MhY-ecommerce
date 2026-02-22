import { formatMoney } from "@/utils/money";
import dayjs from "dayjs";

export function OrderHeader({ order }) {
  const orderDateString = dayjs(order.orderTimeMs).format("MMMM D, YYYY");
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200 gap-4">
      <div className="flex flex-wrap w-full sm:w-auto gap-6 sm:gap-10 text-sm">
        <div>
          <div className="font-bold text-gray-700 uppercase text-xs mb-1">
            Order Placed
          </div>
          <div className="text-gray-600 font-medium">{orderDateString}</div>
        </div>
        <div>
          <div className="font-bold text-gray-700 uppercase text-xs mb-1">
            Total
          </div>
          <div className="text-gray-600 font-medium">
            {formatMoney(order.totalCostCents || 0)}
          </div>
        </div>
      </div>

      <div className="w-full sm:w-auto text-left sm:text-right">
        <div className="font-bold text-gray-700 uppercase text-xs mb-1">
          Order ID
        </div>
        <div className="text-gray-600 text-sm">{order.id}</div>
      </div>
    </div>
  );
}
