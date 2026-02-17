import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function OrdersPage({ cartItems, totalPrice }) {
  return (
    <>
      <title>Orders</title>
      <link
        rel="icon"
        href="/images/orders-favicon.png"
        type="image/png"
        sizes="32x32"
      />
      <div className="flex flex-col min-h-dvh w-full bg-neutral-100">
        <Header />

        <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-6">
          <h1 className="text-[26px] font-semibold mb-3">Your Orders</h1>
          <div className="bg-white border border-gray-300 rounded-lg">
            <div className="flex justify-between items-start text-base px-6 pt-5 pb-4 border-b border-gray-300">
              <div className="flex w-full max-w-64 gap-x-10 text-sm">
                <div>
                  <div className="font-bold text-gray-700 uppercase text-xs">
                    Order Placed
                  </div>
                  <div className="text-gray-600">February 15</div>
                </div>

                <div>
                  <div className="font-bold text-gray-700 uppercase text-xs">
                    Total
                  </div>
                  <div className="text-gray-600">${totalPrice.toFixed(2)}</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-gray-700 uppercase text-xs">
                  Order ID
                </div>
                <div># 27cba69-4c3d</div>
              </div>
            </div>
            <div className="flex flex-col gap-6 p-4 md:p-6">
              {cartItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[auto_1fr_auto] gap-6 items-start pb-6 border-b border-gray-300 last:border-0 last:pb-0"
                  >
                    <div className="aspect-square overflow-hidden w-[100px] h-[100px]">
                      <img
                        src={item.image}
                        alt="item.name"
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                    <div className="flex flex-col h-[100px] justify-between text-base text-neutral-700 font-medium">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        Arriving on: February 19
                      </div>
                      <div className="text-sm text-gray-600">
                        Quantity: {cartItems.length}
                      </div>

                      <button className="w-fit bg-blue-500 text-white text-sm font-medium flex items-center gap-2 mt-1 px-4 py-3 rounded-lg hover:bg-blue-600 transition-all whitespace-nowrap">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                    <Link to={"/tracking"}>
                      <button className="bg-gray-100 px-6 py-3 rounded-lg text-sm font-normal shadow-md hover:translate-y-[-2px] transition-all">
                        Track Package
                      </button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
