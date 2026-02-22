import ProductCard from "./ProductCard";

export default function ProductGrid({ products, loadCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => {
        return (
          <ProductCard key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
