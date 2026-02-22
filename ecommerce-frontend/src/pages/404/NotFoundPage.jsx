import { Link } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFoundPage({ cart }) {
  return (
    <>
      <title>Page not found • MhY</title>
      <link
        rel="icon"
        href="/images/orders-favicon.png"
        type="image/png"
        sizes="32x32"
      />

      <div className="flex flex-col min-h-dvh w-full bg-neutral-100">
        <Header cart={cart} />

        <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>

          <div className="absolute mt-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find the page you were looking for. It might have been
              removed, renamed, or did not exist in the first place.
            </p>

            <Link to="/">
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-sm">
                Go back home
              </button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
