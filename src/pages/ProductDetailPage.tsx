import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../services/productService'
import ProductSkeleton from '../components/ProductSkeleton'
import CategoryBadge from '../components/CategoryBadge'

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id!),
    enabled: Boolean(id),
  })

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#fcf8f5] p-6">
        <div className="mx-auto max-w-5xl">
          <ProductSkeleton />
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#fcf8f5] p-6 text-center">
        <h1 className="text-2xl font-bold text-[#260f08]">
          We couldn't load this product.
        </h1>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-full bg-[#c73a0f] px-5 py-3 font-semibold text-white"
        >
          Try again
        </button>

        <Link
          to="/"
          className="mt-4 text-[#c73a0f] underline"
        >
          Back to desserts
        </Link>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#fcf8f5] p-6 text-center">
        <h1 className="text-3xl font-bold text-[#260f08]">
          Product not found
        </h1>

        <p className="mt-3 text-[#87635a]">
          The requested dessert does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-full bg-[#c73a0f] px-5 py-3 font-semibold text-white"
        >
          Back to desserts
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-6 py-8 md:px-10 md:py-12">
      <article className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-8 inline-block font-semibold text-[#c73a0f] hover:underline"
        >
          ← Back to desserts
        </Link>

        <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full rounded-xl object-cover"
          />

          <div className="flex flex-col justify-center">
            <CategoryBadge name={product.category} />

            <h1 className="mt-2 text-3xl font-bold text-[#260f08]">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-bold text-[#c73a0f]">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-5 text-[#87635a]">
              Discover our delicious{' '}
              {product.name.toLowerCase()}.
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}

export default ProductDetailPage