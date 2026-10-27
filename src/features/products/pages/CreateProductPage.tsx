import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProductForm from "../components/ProductForm";
import { useProductsMutations } from "../hooks/useProductsMutation";
import type { ProductFormValues } from "../schemas/productSchema";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

function CreateProductPage() {
  const navigate = useNavigate();
  const { createMutation } = useProductsMutations();

  const handleCreateProduct = async (values: ProductFormValues) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success("Product created successfully!");
      navigate("/admin/products");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Could not create the product."));
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <Link
        to="/admin/products"
        className="mb-6 inline-block text-sm font-medium text-[#87635a] hover:text-[#c73a0f]"
      >
        ← Back to Products
      </Link>

      <h1 className="mb-2 text-3xl font-bold text-[#260f08]">Create Product</h1>

      <p className="mb-8 text-[#87635a]">Add a new dessert to your store.</p>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <ProductForm
          onSubmit={handleCreateProduct}
          isSubmitting={createMutation.isPending}
          submitLabel="Create Product"
        />
      </section>
    </main>
  );
}

export default CreateProductPage;
