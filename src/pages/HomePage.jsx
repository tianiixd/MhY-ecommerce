import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { products } from "../data/products";

export default function HomePage() {
  return (
    <>
      <title>Home</title>
      <div className="flex flex-col min-h-dvh w-full bg-neutral-100">
        <Header />
        <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6">
          <ProductGrid products={products} />
        </main>
        <Footer />
      </div>
    </>
  );
}
