import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories } from "../hooks/useCategories";
import {
  productSchema,
  type ProductFormValues,
} from "../schemas/productSchema";

interface ProductFormProps {
  defaultValues?: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const emptyValues: ProductFormValues = {
  name: "",
  category: "",
  price: 0,
  image: "",
};

function ProductForm({
  defaultValues = emptyValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Product",
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    defaultValues.name,
    defaultValues.category,
    defaultValues.price,
    defaultValues.image,
    reset,
  ]);

  const inputClassName =
    "w-full rounded-lg border border-[#d9c8c4] bg-white px-4 py-3 text-[#260f08] outline-none focus:border-[#c73a0f]";

  const errorClassName = "mt-1 text-sm text-red-600";

  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useCategories();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block font-medium text-[#260f08]">
          Product Name
        </label>

        <input
          id="name"
          type="text"
          {...register("name")}
          className={inputClassName}
          placeholder="e.g. Chocolate Cake"
          aria-invalid={Boolean(errors.name)}
        />

        {errors.name && <p className={errorClassName}>{errors.name.message}</p>}
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block font-medium text-[#260f08]"
        >
          Category
        </label>

        <select
          id="category"
          {...register("category")}
          className={inputClassName}
          disabled={isCategoriesPending || isCategoriesError}
          aria-invalid={Boolean(errors.category)}
        >
          <option value="">
            {isCategoriesPending
              ? "Loading categories..."
              : "Select a category"}
          </option>

          {categories?.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {isCategoriesError && (
          <p className={errorClassName}>
            Could not load categories. Please try again.
          </p>
        )}

        {errors.category && (
          <p className={errorClassName}>{errors.category.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="mb-2 block font-medium text-[#260f08]"
        >
          Price ($)
        </label>

        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className={inputClassName}
          placeholder="5.50"
          aria-invalid={Boolean(errors.price)}
        />

        {errors.price && (
          <p className={errorClassName}>{errors.price.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="image"
          className="mb-2 block font-medium text-[#260f08]"
        >
          Image URL
        </label>

        <input
          id="image"
          type="text"
          {...register("image")}
          className={inputClassName}
          placeholder="/images/dessert.jpg"
          aria-invalid={Boolean(errors.image)}
        />

        {errors.image && (
          <p className={errorClassName}>{errors.image.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#c73a0f] px-5 py-3 font-semibold text-white transition hover:bg-[#a82f0b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;
