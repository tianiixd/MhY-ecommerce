import CheckoutHeader from "./CheckoutHeader";
import { products } from "../../data/products";

export default function CheckoutPage() {
  const cartItems = [
    products[0],
    products[1],
    products[2],
    products[3],
    products[4],
    products[5],
  ];
  return (
    <>
      <title>Checkout</title>

      <div className="min-h-screen w-full bg-neutral-100 ">
        <CheckoutHeader itemsCount={cartItems.length} />
        <main className="max-w-6xl mx-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-4">Review your order</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            <div className="space-y-4">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-300 rounded-lg p-6"
                >
                  <h3 className="text-black font-bold text-lg mb-4">
                    Delivery date: Tuesday, June 21
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-contain"
                      />
                      <div>
                        <h4 className="font-bold mb-1">{product.name}</h4>
                        <p className="text-green-700 font-bold mb-2">
                          ${(product.priceCents / 100).toFixed(2)}
                        </p>
                        <div className="text-sm">
                          <span>Quantity: 1</span>
                          <button className="text-blue-600 hover:underline ml-2">
                            Update
                          </button>
                          <button className="text-blue-600 hover:underline ml-2">
                            Delete
                          </button>
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
      </div>
    </>
  );
}
