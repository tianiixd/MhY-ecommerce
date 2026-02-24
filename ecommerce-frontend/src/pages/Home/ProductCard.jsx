import { useState } from "react";
import { formatMoney } from "@/utils/money";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

export default function ProductCard({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const addToCart = async () => {
    try {
      setIsAdding(true);

      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity,
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
            {quantity}x <span className="font-bold">{product.name}</span> added
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

  const selectQuantity = (e) => {
    const quantitySelected = Number(e.target.value);
    setQuantity(quantitySelected);
  };

  return (
    <div
      className="flex flex-col border border-gray-300 p-4 rounded-lg bg-white shadow-sm hover:translate-y-[-10px] transition-all"
      data-testid="product-card"
    >
      <div className="aspect-square w-full overflow-hidden mb-3">
        <img
          data-testid="product-image"
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain rounded-md"
        />
      </div>
      <h3 className="text-base font-semibold line-clamp-2 min-h-[2.5rem] mb-2">
        {product.name}
      </h3>

      <div className="flex items-center">
        <img
          data-testid="product-rating-stars-image"
          className="w-20 mr-2"
          src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
          alt={`${product.rating.stars} stars`}
        />
        <div className="text-blue-500 text-base hover:text-blue-400 transition-colors cursor-pointer">
          {product.rating.count}
        </div>
      </div>

      <div className="mt-auto">
        <div className="mb-4">
          <p className="font-semibold text-base mb-2">
            {formatMoney(product.priceCents)}
          </p>
          <select
            data-testid="product-quantity-selector"
            onChange={selectQuantity}
            value={quantity}
            disabled={isAdding}
            className="bg-neutral-100 border border-neutral-300 rounded-md p-1 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 cursor-pointer disabled:opacity-50"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <button
          data-testid="add-to-cart-button"
          onClick={addToCart}
          disabled={isAdding}
          className="w-full bg-blue-500 py-3 rounded-lg text-neutral-100 font-medium hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
