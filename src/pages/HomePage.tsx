import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import CartDrawer from "../components/CartDrawer";
import ConfirmOrderModal from "../components/ConfirmOrderModal";
import { useProducts } from "../hooks/useProducts";
import { useCartStore } from "../features/cart/stores/cartStore";

const PAGE_SIZE = 8;

function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const {
    data: allProducts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts(search, category);

  const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(totalPages, 1));
  const products = allProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleConfirm = () => {
    setIsCartOpen(false);
    setIsConfirmOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-6 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <Header />

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="rounded-full border border-[#d9c8c4] bg-white px-4 py-3 font-semibold text-[#260f08] transition-colors hover:border-[#c73a0f] hover:text-[#c73a0f]"
            >
              Admin
            </Link>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping cart, ${totalItems} items`}
              className="flex items-center gap-2 rounded-full border border-[#ad6250] bg-white px-4 py-3 font-semibold text-[#260f08] transition-colors hover:border-[#c73a0f] hover:text-[#c73a0f]"
            >
              <span aria-hidden="true">🛒</span>
              <span>Cart ({totalItems})</span>
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search desserts..."
            aria-label="Search desserts by name"
            className="w-full rounded-lg border border-[#eaded7] bg-white px-4 py-3 text-[#260f08] outline-none focus:border-[#c73a0f] sm:flex-1"
          />

          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            aria-label="Filter by category"
            className="rounded-lg border border-[#eaded7] bg-white px-4 py-3 text-[#260f08] outline-none focus:border-[#c73a0f]"
          >
            <option value="">All categories</option>
            <option value="Waffle">Waffle</option>
            <option value="Crème Brûlée">Crème Brûlée</option>
            <option value="Macaron">Macaron</option>
            <option value="Tiramisu">Tiramisu</option>
            <option value="Baklava">Baklava</option>
            <option value="Pie">Pie</option>
            <option value="Cake">Cake</option>
            <option value="Brownie">Brownie</option>
            <option value="Panna Cotta">Panna Cotta</option>
          </select>
        </div>

        <section aria-label="Dessert catalog">
          <h2 className="mb-6 text-2xl font-bold text-[#260f08]">Desserts</h2>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }, (_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-xl bg-white p-8 text-center">
              <p className="font-semibold text-[#260f08]">
                We couldn't load the desserts.
              </p>

              <p className="mt-2 text-sm text-[#87635a]">
                {error instanceof Error
                  ? error.message
                  : "An unexpected error occurred."}
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 rounded-full bg-[#c73a0f] px-5 py-3 font-semibold text-white hover:bg-[#a92f0c]"
              >
                Try again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center">
              <p className="font-semibold text-[#260f08]">No desserts found.</p>

              <p className="mt-2 text-sm text-[#87635a]">
                Try another name or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && !isError && totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage(currentPage - 1)}
                className="rounded-full border border-[#d9c8c4] bg-white px-5 py-2 text-[#260f08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-[#87635a]" aria-live="polite">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="rounded-full border border-[#d9c8c4] bg-white px-5 py-2 text-[#260f08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onConfirm={handleConfirm}
      />

      <ConfirmOrderModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onStartNewOrder={() => {
          useCartStore.getState().clearCart();
          setIsConfirmOpen(false);
        }}
      />
    </main>
  );
}

export default HomePage;
