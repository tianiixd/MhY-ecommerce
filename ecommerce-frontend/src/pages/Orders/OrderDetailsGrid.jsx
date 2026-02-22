import dayjs from "dayjs";
import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

export function OrderDetailsGrid({ order, loadCart }) {
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const addToCart = async (product) => {
    try {
      setIsAdding(true);

      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity: 1,
      });
      await loadCart();

      toast({
        title: (
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-bold">Added to Cart</span>
          </div>
        ),
        description: (
          <div className="text-green-800 font-medium ml-7 mt-1">
            1x <span className="font-bold">{product.name}</span> added
            successfully.
          </div>
        ),
        className:
          "bg-green-50 border border-green-200 shadow-lg rounded-xl p-4",
      });
    } catch (error) {
      console.error("Failed to add a product to a cart", error);

      toast({
        variant: "destructive",
        title: "Action Failed",
        description: "Could not add the item to your cart. Please try again.",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      {order.products &&
        order.products.map((orderProduct) => {
          const deliveryDateString = dayjs(
            orderProduct.estimatedDeliveryTimeMs,
          ).format("MMMM D, YYYY");
          const isDelivered = dayjs().isAfter(
            dayjs(orderProduct.estimatedDeliveryTimeMs),
          );
          const imagePath = orderProduct.product.image?.startsWith("/")
            ? orderProduct.product.image
            : `/${orderProduct.product.image}`;

          return (
            <div
              key={orderProduct.product.id}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start pb-6 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div className="flex-shrink-0 aspect-square w-24 h-24 sm:w-[120px] sm:h-[120px] rounded-lg overflow-hidden p-1">
                <img
                  src={imagePath}
                  alt={orderProduct.product.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>

              <div className="flex-grow flex flex-col w-full">
                <div className="font-bold text-lg text-gray-900 line-clamp-2">
                  {orderProduct.product.name}
                </div>
                <div className="text-sm text-sky-600 font-medium mt-1">
                  {isDelivered ? "Delivered on: " : "Arriving on: "}
                  {deliveryDateString}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Qty: {orderProduct.quantity}
                </div>

                <button
                  onClick={() => addToCart(orderProduct.product)}
                  disabled={isAdding}
                  className="mt-4 w-full sm:w-fit bg-blue-600 text-white text-sm font-medium flex justify-center items-center gap-2 px-5 py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy it again</span>
                </button>
              </div>

              <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <Link
                  to={`/tracking/${order.id}/${orderProduct.product.id}`}
                  className="block w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium shadow-md hover:bg-gray-50 hover:text-gray-900 transition-all">
                    Track Package
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}
