import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Header from "@/components/Header";
import dayjs from "dayjs";

export default function TrackingPage({ cart = [] }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function trackOrder() {
      try {
        const res = await axios.get(`/api/orders/${orderId}?expand=products`);
        setOrder(res.data);
      } catch (error) {
        console.error("Failed to fetch tracking data", error);
      }
    }
    if (orderId) trackOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex flex-col min-h-dvh w-full bg-neutral-100">
        <Header cart={cart} />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 font-medium">
            Loading tracking details...
          </p>
        </main>
      </div>
    );
  }

  const orderProduct = order.products?.find(
    (product) => product.productId === productId,
  );

  if (!orderProduct) {
    return (
      <div className="flex flex-col min-h-dvh w-full bg-neutral-100">
        <Header cart={cart} />
        <main className="flex-grow p-8 text-center">
          <p className="text-red-500 font-medium">
            Product not found in this order.
          </p>
        </main>
      </div>
    );
  }

  const currentTime = dayjs().valueOf();
  const orderTime = order.orderTimeMs || currentTime;
  const deliveryTime = orderProduct.estimatedDeliveryTimeMs || currentTime;

  let statusPercentage = 0;

  if (currentTime >= deliveryTime) {
    statusPercentage = 100;
  } else if (currentTime <= orderTime) {
    statusPercentage = 5;
  } else {
    const totalDuration = deliveryTime - orderTime;
    const elapsed = currentTime - orderTime;
    statusPercentage = Math.round((elapsed / totalDuration) * 100);
  }

  const isPreparing = statusPercentage < 33;
  const isShipped = statusPercentage >= 33 && statusPercentage < 100;
  const isDelivered = statusPercentage >= 100;

  const imagePath = orderProduct.product.image?.startsWith("/")
    ? orderProduct.product.image
    : `/${orderProduct.product.image}`;

  return (
    <>
      <title>Track Package</title>
      <link
        rel="icon"
        href="/images/orders-favicon.png"
        type="image/png"
        sizes="32x32"
      />
      <div className="flex flex-col min-h-dvh w-full bg-neutral-100">
        <Header cart={cart} />

        <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-8">
          <div className="mb-6">
            <Link
              to="/orders"
              className="text-sky-500 font-medium hover:text-sky-600 hover:underline transition-colors"
            >
              View all orders
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
              {isDelivered ? "Delivered on " : "Arriving on "}
              {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                "dddd, MMMM D",
              )}
            </h1>

            <div className="text-gray-700 mb-1 text-lg font-medium">
              {orderProduct.product.name}
            </div>
            <div className="text-gray-600 mb-8">
              Quantity: {orderProduct.quantity}
            </div>

            <div className="mb-10 aspect-square overflow-hidden w-[150px] h-[150px]  rounded-lg ">
              <img
                src={imagePath}
                alt={orderProduct.product.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-full">
              <div className="flex justify-between text-base md:text-lg font-medium text-gray-400 mb-4">
                <span className={isPreparing ? "text-sky-600" : ""}>
                  Preparing
                </span>
                <span className={isShipped ? "text-sky-600" : ""}>Shipped</span>
                <span className={isDelivered ? "text-sky-600" : ""}>
                  Delivered
                </span>
              </div>

              <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-sky-500 transition-all duration-1000 ease-out"
                  style={{ width: `${statusPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
