import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProductsMutations } from "../hooks/useProductsMutation";
import type { Product } from "../../../types/product";
import CategoryBadge from "../../../components/CategoryBadge";
import DeleteProductModal from "../components/DeleteProductModal";
import { usePaginatedProducts } from "../hooks/useProductsQueries";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

function ProductsAdminPage() {
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { deleteMutation } = useProductsMutations();

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteMutation.mutateAsync(productToDelete.id);
      toast.success("Product deleted successfully!");
      setProductToDelete(null);
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Could not delete the product."));
    }
  };

  const [page, setPage] = useState(1);

  const {
    data: result,
    isPending,
    isError,
    isFetching,
    refetch,
  } = usePaginatedProducts(page);

  const products = result?.data ?? [];
  const totalPages = result?.pages ?? 0;

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#260f08]">
            Product Management
          </h1>
          <p className="mt-2 text-[#87635a]">
            Manage the products in your dessert store.
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="rounded-full bg-[#c73a0f] px-5 py-3 font-semibold text-white hover:bg-[#a82f0b]"
        >
          + Create Product
        </Link>
      </div>

      {isPending && (
        <p className="py-10 text-center text-[#87635a]">Loading products...</p>
      )}

      {isError && (
        <div className="rounded-xl bg-white p-6 text-center">
          <p className="mb-4 text-red-600">Could not load products.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full border border-[#c73a0f] px-5 py-2 text-[#c73a0f]"
          >
            Try Again
          </button>
        </div>
      )}

      {products && products.length === 0 && (
        <p className="rounded-xl bg-white p-8 text-center text-[#87635a]">
          No products found. Create your first product!
        </p>
      )}

      {products && products.length > 0 && (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[600px] text-left">
            <thead className="border-b border-[#eee1dc] bg-[#fcf8f6]">
              <tr>
                <th className="px-5 py-4">Actions</th>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">ID</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#eee1dc] last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="font-medium text-[#c73a0f] hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => setProductToDelete(product)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-[#260f08]">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt=""
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      {product.name}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <CategoryBadge name={product.category} />
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#c73a0f]">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-[#87635a]">{product.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((current) => current - 1)}
            className="rounded-full border border-[#d9c8c4] px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-[#87635a]" aria-live="polite">
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage((current) => current + 1)}
            className="rounded-full border border-[#d9c8c4] px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      <div className="mt-6">
        <Link
          to="/"
          className="text-sm font-medium text-[#87635a] hover:text-[#c73a0f]"
        >
          ← Back to Store
        </Link>
      </div>

      <DeleteProductModal
        product={productToDelete}
        isDeleting={deleteMutation.isPending}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
      />
    </main>
  );
}

export default ProductsAdminPage;
