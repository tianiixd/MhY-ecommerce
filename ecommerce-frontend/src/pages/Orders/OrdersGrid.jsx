import { OrderHeader } from "./OrderHeader";
import { OrderDetailsGrid } from "./OrderDetailsGrid";

export function OrdersGrid({ orders, loadCart }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-gray-500">You haven't placed any orders yet.</div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {orders.map((order) => {
        return (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <OrderHeader order={order} />

            <OrderDetailsGrid order={order} loadCart={loadCart} />
          </div>
        );
      })}
    </div>
  );
}
