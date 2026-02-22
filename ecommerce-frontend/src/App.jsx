import { Routes, Route } from "react-router";
import HomePage from "./pages/Home/HomePage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import TrackingPage from "./pages/Orders/TrackingPage";
import NotFoundPage from "./pages/404/NotFoundPage";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = useCallback(() => {
    axios
      .get("/api/cart-items?expand=product")
      .then((res) => {
        setCart(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch cart data:", error);
      });
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route
          path="/orders"
          element={<OrdersPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        ></Route>
        <Route path="*" element={<NotFoundPage cart={cart} />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
