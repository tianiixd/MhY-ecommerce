import { useState, useEffect } from "react";
import axios from "axios";
import { OrdersGrid } from "./OrdersGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trash, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

export default function OrdersPage({ cart = [], loadCart }) {
  const [orders, setOrders] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const resetOrder = async () => {
    try {
      setIsDeleting(true);

      await axios.post("/api/reset");

      const res = await axios.get("/api/orders?expand=products");
      setOrders(Array.isArray(res.data) ? res.data : []);

      await loadCart();

      toast({
        title: (
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-bold">Database Reset</span>
          </div>
        ),
        description: (
          <div className="text-green-800 font-medium ml-7 mt-1">
            Orders have been restored to the default state.
          </div>
        ),
        className:
          "bg-green-50 border border-green-200 shadow-lg rounded-xl p-4",
      });
    } catch (error) {
      console.error("Failed to reset orders:", error);
      toast({
        variant: "destructive",
        title: "Action Failed",
        description: "Could not reset your orders. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    async function getOrders() {
      try {
        const res = await axios.get("/api/orders?expand=products");
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }
    getOrders();
  }, []);

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
        <Header cart={cart} />

        <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-6">
          <h1 className="text-[26px] font-semibold mb-3">Your Orders</h1>
          <OrdersGrid orders={orders} loadCart={loadCart} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                disabled={isDeleting}
                className="flex items-center gap-2 fixed bottom-20 right-8 z-50 p-3 text-gray-100 font-medium bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <Trash className="w-5 h-5"></Trash>
                {isDeleting ? "Resetting..." : "Reset Order"}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your entire order history from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={resetOrder}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Yes, delete history
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>
        <Footer />
      </div>
    </>
  );
}
