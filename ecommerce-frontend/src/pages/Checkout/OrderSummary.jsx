import { DeliveryOptions } from "./DeliveryOptions";
import { DeliveryDate } from "./DeliveryDate";
import { CartItemDetails } from "./CartItemDetails";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="space-y-4">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <div
              key={cartItem.id}
              className="bg-white border border-gray-300 rounded-lg p-6"
            >
              <DeliveryDate
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
