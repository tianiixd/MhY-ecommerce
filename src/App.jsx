import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage";
import { products } from "./data/products";

function App() {
  const cartItems = [
    products[0],
    products[1],
    products[2],
    products[3],
    products[4],
    products[5],
  ];
  const totalPrice = cartItems.reduce((acc, item) => acc + item.priceCents, 0);

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/orders"
        element={<OrdersPage cartItems={cartItems} totalPrice={totalPrice} />}
      />
      <Route
        path="/checkout"
        element={<CheckoutPage cartItems={cartItems} />}
      />
      <Route path="/tracking" element={<TrackingPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
