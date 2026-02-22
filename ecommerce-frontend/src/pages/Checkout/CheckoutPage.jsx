import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import CheckoutHeader from "./CheckoutHeader";
import Footer from "@/components/Footer";

export default function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  useEffect(() => {
    const fetchCheckoutData = async () => {
      if (cart.length === 0) return;

      try {
        let res = await axios.get("/api/delivery-options");
        const deliveryOptionsData = res.data;
        setDeliveryOptions(deliveryOptionsData);
      } catch (error) {
        console.error("Failed to fetch checkout data:", error);
      }
    };
    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      try {
        const res = await axios.get("/api/payment-summary");
        const data = res.data;
        setPaymentSummary(data);
      } catch (error) {
        console.error("Failed to fetch paymentSummary data:", error);
      }
    };
    fetchPaymentSummary();
  }, [cart]);

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
        <CheckoutHeader itemsCount={totalQuantity} />

        <main className="flex-grow w-full max-w-6xl mx-auto p-4 md:p-6">
          {cart.length === 0 ? (
            <div className="bg-white border border-gray-300 rounded-lg p-12 text-center shadow-sm max-w-2xl mx-auto mt-10">
              <h2 className="text-2xl font-bold mb-4">
                Your cart is completely empty.
              </h2>
              <p className="text-gray-600 mb-8">
                You cannot checkout without adding items to your order.
              </p>

              <Link to="/">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-sm">
                  Return to Shop
                </button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold mb-3">Review your order</h1>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
                <OrderSummary
                  cart={cart}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />

                <div className="bg-white border border-gray-300 rounded-lg p-6 h-fit sticky top-20">
                  <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
                  <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                  />
                </div>
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
