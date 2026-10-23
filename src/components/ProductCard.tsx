import { useState } from 'react'
import type { Product } from '../types/product'
import QuantityStepper from './QuantityStepper'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0)

  return (
    <article className="min-w-0">
      <div className="relative mb-8">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full rounded-lg object-cover"
        />

        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => setQuantity(1)}
              className="flex w-44 items-center justify-center gap-2
                rounded-full border border-[#ad6250] bg-white px-4 py-3
                text-sm font-semibold text-[#260f08]
                transition-colors hover:border-[#c73a0f]
                hover:text-[#c73a0f]"
            >
              <span aria-hidden="true">🛒</span>
              Add to Cart
            </button>
          ) : (
            <QuantityStepper
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => q - 1)}
            />
          )}
        </div>
      </div>

      <div className="pt-1">
        <p className="text-sm text-[#87635a]">
          {product.category}
        </p>

        <h2 className="mt-1 font-semibold text-[#260f08]">
          {product.name}
        </h2>

        <p className="mt-1 font-semibold text-[#c73a0f]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}

export default ProductCard
