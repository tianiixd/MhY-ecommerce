import Header from "@/components/Header";
import ProductGrid from "../components/ProductGrid";
import Footer from "@/components/Footer";

export default function HomePage({ products }) {
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
        <Header />
        <main className="flex-grow w-full max-w-full mx-auto p-4 md:p-6">
          <ProductGrid products={products} />
        </main>
        <Footer />
      </div>
    </>
  );
}
