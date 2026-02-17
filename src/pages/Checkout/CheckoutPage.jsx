import CheckoutHeader from "./CheckoutHeader";
import Footer from "@/components/Footer";

export default function CheckoutPage({ cartItems }) {
  return (
    <>
      <title>Checkout</title>
      <link
        rel="icon"
        href="/images/cart-favicon.png"
        type="image/png"
        sizes="32x32"
      />
      <div className="flex flex-col min-h-dvh w-full bg-neutral-100 ">
        <CheckoutHeader itemsCount={cartItems.length} />
        <main className="flex-grow w-full max-w-6xl mx-auto p-4 md:p-6">
          <h1 className="text-2xl font-semibold mb-3">Review your order</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            <div className="space-y-4">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-300 rounded-lg p-6"
                >
                  <h3 className="text-black font-semibold text-lg mb-4">
                    Delivery date: Tuesday, June 21
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-contain rounded-md"
                      />

                      <div className="flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold mb-1 line-clamp-2">
                            {product.name}
                          </h4>
                          <p className="text-green-700 font-bold">
                            ${(product.priceCents / 100).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm text-gray-600">Qty: 1</span>
                          <div className="flex gap-2">
                            <button className="px-3 py-2 text-sm text-neutral-100 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors">
                              Update
                            </button>
                            <button className="px-3 py-2 text-sm text-neutral-100 rounded-md bg-red-600 hover:bg-red-700 transition-colors">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-bold mb-2">
                        Choose a delivery option:
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`delivery-${product.id}`}
                          defaultChecked
                        />
                        <div>
                          <div className="text-blue-600 font-bold text-sm">
                            Tuesday, June 21
                          </div>
                          <div className="text-gray-500  text-sm">
                            FREE Shipping
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input type="radio" name={`delivery-${product.id}`} />
                        <div>
                          <div className="text-blue-600 font-bold text-sm">
                            Wednesday, June 15
                          </div>
                          <div className="text-gray-500 text-sm">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input type="radio" name={`delivery-${product.id}`} />
                        <div>
                          <div className="text-blue-600 font-bold text-sm">
                            Monday, June 13
                          </div>
                          <div className="text-gray-500 text-sm">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6 h-fit sticky top-20">
              <h2 className="text-lg font-bold mb-4">Payment Summary</h2>

              <div className="space-y-2 text-sm text-gray-600 mb-4 border-b pb-4">
                <div className="flex justify-between">
                  <span>Items (3):</span>
                  <span>$42.75</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & handling:</span>
                  <span>$4.99</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t">
                  <span>Total before tax:</span>
                  <span>$47.74</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated tax (10%):</span>
                  <span>$4.77</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Order total:</span>
                <span className="text-green-700">$52.51</span>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm">
                Place your order
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
