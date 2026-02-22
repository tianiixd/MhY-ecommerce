import dayjs from "dayjs";
export function DeliveryDate({ cartItem, deliveryOptions }) {
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  const today = dayjs();
  const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return (
    <h3 className="text-black font-semibold text-lg mb-4">
      Delivery date: {dateString}
    </h3>
  );
}
