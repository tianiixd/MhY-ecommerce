export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col border p-4 rounded-lg bg-white shadow-sm">
      <div className="aspect-square w-full overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.keywords[0]}
          className="w-full h-full object-contain rounded-md"
        />
      </div>
      <h3 className="text-base font-semibold line-clamp-2 h-auto mb-2">
        {product.name}
      </h3>

      <div className="flex items-center mb-2">
        <img
          className="w-20 mr-2"
          src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
          alt={`${product.rating.stars} stars`}
        />
        <div className="text-blue-500 text-base hover:text-blue-400 transition-colors cursor-pointer">
          {product.rating.count}
        </div>
      </div>

      <div className="mt-auto">
        <div className="mb-4 mt-2">
          <select className="bg-neutral-100 border border-neutral-300 rounded-md p-1 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 cursor-pointer">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <p className="font-semibold text-base mb-2">
          ${(product.priceCents / 100).toFixed(2)}
        </p>
        <button className="w-full bg-blue-500 py-3 rounded-lg text-sm text-neutral-100 font-medium hover:bg-blue-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
