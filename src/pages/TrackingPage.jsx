import { Link } from "react-router";
import Header from "@/components/Header";
import { products } from "@/data/products";

export default function TrackingPage() {
  // Mock Data: In a real app, you'd pull this from the URL params or an API
  const trackedItem = {
    product: products[1],
    arrivingDate: "Thursday, February 19",
    statusPercentage: 45,
    statusLabel: "Shipped",
  };

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
        <Header />

        <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-8">
          <div className="mb-6">
            <Link
              to="/orders"
              className="text-sky-500 font-medium hover:text-sky-600 hover:underline transition-colors"
            >
              View all orders
            </Link>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Arriving on {trackedItem.arrivingDate}
          </h1>

          <div className="text-gray-700 mb-1">{trackedItem.product.name}</div>
          <div className="text-gray-600 mb-8">Quantity: 1</div>

          <div className="mb-10 aspect-square overflow-hidden w-[150px] h-[150px]">
            <img
              src={trackedItem.product.image}
              alt={trackedItem.product.name}
              className="w-full h-full object-contain rounded-md"
            />
          </div>

          <div className="w-full">
            <div className="flex justify-between text-base md:text-lg font-medium text-gray-500 mb-4">
              <span
                className={
                  trackedItem.statusPercentage >= 0 ? "text-sky-600" : ""
                }
              >
                Preparing
              </span>
              <span
                className={
                  trackedItem.statusPercentage >= 50 ? "text-sky-600" : ""
                }
              >
                Shipped
              </span>
              <span
                className={
                  trackedItem.statusPercentage >= 100 ? "text-sky-600" : ""
                }
              >
                Delivered
              </span>
            </div>

            <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-sky-500 transition-all duration-1000 ease-out"
                style={{ width: `${trackedItem.statusPercentage}%` }}
              ></div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
