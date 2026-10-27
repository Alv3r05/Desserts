import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ProductForm from "../components/ProductForm";
import { useProductsMutations } from "../hooks/useProductsMutation";
import { getProductById } from "../../../services/productService";
import type { ProductFormValues } from "../schemas/productSchema";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateMutation } = useProductsMutations();

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (product === undefined && !isPending && !isError) {
      toast.error("Product not found.");
      navigate("/admin/products", { replace: true });
    }
  }, [product, isPending, isError, navigate]);

  const handleUpdateProduct = async (values: ProductFormValues) => {
    if (!id) return;

    try {
      await updateMutation.mutateAsync({
        id,
        product: values,
      });

      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Could not update the product."));
    }
  };

  if (isPending) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-[#87635a]">Loading product...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-10">
        <p className="mb-4 text-red-600">Could not load the product.</p>
        <Link to="/admin/products" className="text-[#c73a0f]">
          Back to Products
        </Link>
      </main>
    );
  }

  if (!product) return null;

  const defaultValues: ProductFormValues = {
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
  };

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <Link
        to="/admin/products"
        className="mb-6 inline-block text-sm text-[#87635a] hover:text-[#c73a0f]"
      >
        ← Back to Products
      </Link>

      <h1 className="mb-2 text-3xl font-bold text-[#260f08]">Edit Product</h1>

      <p className="mb-8 text-[#87635a]">
        Update the information for {product.name}.
      </p>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <ProductForm
          defaultValues={defaultValues}
          onSubmit={handleUpdateProduct}
          isSubmitting={updateMutation.isPending}
          submitLabel="Save Changes"
        />
      </section>
    </main>
  );
}

export default EditProductPage;
