import { formatMoney } from "@/utils/money";
import axios from "axios";
import dayjs from "dayjs";
export function DeliveryOptions({ cartItem, deliveryOptions, loadCart }) {
  return (
    <div className="space-y-2">
      <div className="font-bold mb-2">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        const updateDeliveryOption = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id,
          });

          await loadCart();
        };

        let priceString = "FREE Shipping";

        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
        const dateString = deliveryDate.format("dddd, MMMM D");

        return (
          <div
            onClick={updateDeliveryOption}
            className="flex items-center gap-2 cursor-pointer select-none"
            key={deliveryOption.id}
          >
            <input
              type="radio"
              name={`delivery-${cartItem.productId}`}
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={updateDeliveryOption}
            />
            <div>
              <div className="text-blue-600 font-bold text-sm">
                {dateString}
              </div>
              <div className="text-gray-500  text-sm">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
