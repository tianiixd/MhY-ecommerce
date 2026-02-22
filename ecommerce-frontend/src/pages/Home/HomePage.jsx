import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductGrid from "./ProductGrid";
import Footer from "@/components/Footer";
import { useSearchParams, Link } from "react-router";

export default function HomePage({ cart, loadCart }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProductData() {
      try {
        if (search) {
          const res = await axios.get(`/api/products/?search=${search}`);
          const data = Array.isArray(res.data) ? res.data : [];
          setProducts(data);
        } else {
          const res = await axios.get("/api/products");
          const data = Array.isArray(res.data) ? res.data : [];
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getProductData();
  }, [search]);

  return (
    <>
      <title>Home</title>
      <link
        rel="icon"
        href="/images/home-favicon.png"
        type="image/png"
        sizes="32x32"
      />

      <div className="flex flex-col min-h-dvh w-full bg-neutral-100">
        <Header cart={cart} />
        <main className="flex-grow w-full max-w-full mx-auto p-4 md:p-6">
          {isLoading ? (
            <div className="text-center text-gray-500 mt-10">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-center max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No results found
              </h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching{" "}
                <span className="font-bold">"{search}"</span>. Try checking for
                typos or using broader keywords.
              </p>
              <Link to="/">
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  Clear Search
                </button>
              </Link>
            </div>
          ) : (
            <ProductGrid products={products} loadCart={loadCart} />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
