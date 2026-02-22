import { useState } from "react";
import { formatMoney } from "@/utils/money";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    try {
      await axios.delete(`/api/cart-items/${cartItem.productId}`);
      await loadCart();
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  const updateCartItem = async () => {
    if (isUpdating) {
      try {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
          quantity: Number(quantity),
        });
        await loadCart();
      } catch (error) {
        console.error("Failed to update cart item:", error);
      }
      setIsUpdating(false);
    } else {
      setIsUpdating(true);
    }
  };

  const updateCartItemOnKey = async (e) => {
    if (isUpdating) {
      if (e.key === "Enter") {
        try {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: Number(quantity),
          });
          await loadCart();
        } catch (error) {
          console.error("Failed to update cart item:", error);
        }
        setIsUpdating(false);
      } else if (e.key === "Escape") {
        setQuantity(cartItem.quantity);
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="flex gap-4">
      <div className="aspect-square w-24 h-24 overflow-hidden">
        <img
          src={cartItem.product.image}
          alt={cartItem.product.name}
          className="w-full h-full object-contain rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h4 className="font-bold mb-1 line-clamp-2">
            {cartItem.product.name}
          </h4>
          <p className="text-green-700 font-bold">
            {formatMoney(cartItem.product.priceCents)}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm text-gray-600 font-medium">Qty:</span>
          <input
            type="number"
            value={quantity}
            onKeyDown={updateCartItemOnKey}
            onChange={(e) => setQuantity(e.target.value)}
            className={`${isUpdating ? "inline-block" : "hidden"} p-2 border-2 border-gray-300 text-sm text-neutral-800 rounded-lg outline-none text-center w-14 focus:border-sky-500 transition-all`}
            min={1}
          />
          <span
            className={`text-sm text-gray-600 ${isUpdating ? "hidden" : "inline"}`}
          >
            {cartItem.quantity}
          </span>
          <div className="flex gap-2">
            <button
              onClick={updateCartItem}
              className="px-3 py-2 text-sm text-neutral-100 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {isUpdating ? "Save" : "Update"}
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="px-3 py-2 text-sm text-neutral-100 rounded-md bg-red-600 hover:bg-red-700 transition-colors">
                  Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove from cart?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove "{cartItem.product.name}"
                    from your order?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deleteCartItem}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Yes, remove it
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
