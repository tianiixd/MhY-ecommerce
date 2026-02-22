import { formatMoney } from "@/utils/money";
import { useNavigate } from "react-router";
import axios from "axios";

export function PaymentSummary({ paymentSummary, loadCart }) {
  const navigate = useNavigate();

  const createOrder = async () => {
    await axios.post("/api/orders");
    await loadCart();
    setTimeout(() => {
      navigate("/orders");
    }, 1000);
  };

  return (
    <>
      {paymentSummary && (
        <>
          <div className="space-y-2 text-sm text-gray-600 mb-4 border-b border-gray-300 pb-4">
            <div className="flex justify-between">
              <span>Items ({paymentSummary.totalItems}):</span>
              <span>{formatMoney(paymentSummary.productCostCents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & handling:</span>
              <span>{formatMoney(paymentSummary.shippingCostCents)}</span>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t border-gray-300">
              <span>Total before tax:</span>
              <span>{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated tax (10%):</span>
              <span>{formatMoney(paymentSummary.taxCents)}</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Order total:</span>
            <span className="text-green-700">
              {formatMoney(paymentSummary.totalCostCents)}
            </span>
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm"
            onClick={createOrder}
          >
            Place your order
          </button>
        </>
      )}
    </>
  );
}
