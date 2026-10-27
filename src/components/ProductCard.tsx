
import type { Product } from '../types/product'
import { useCartStore } from '../features/cart/stores/cartStore'
import QuantityStepper from './QuantityStepper'
import CategoryBadge from './CategoryBadge'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  )
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  )

  const cartItem = items.find(
    (item) => item.product.id === product.id,
  )

  const quantity = cartItem?.quantity ?? 0

  return (
    <article className="min-w-0">
      <div className="relative mb-8">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full rounded-xl object-cover"
          />
        </Link>

        <div className="absolute -bottom-5 left-1/2 w-40 -translate-x-1/2">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => addItem(product)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#c73a0f] bg-white px-4 py-3 font-semibold text-[#260f08] shadow-sm transition hover:text-[#c73a0f]"
            >
              <span aria-hidden="true">🛒</span>
              Add to Cart
            </button>
          ) : (
            <QuantityStepper
              quantity={quantity}
              onIncrease={() => increaseQuantity(product.id)}
              onDecrease={() => decreaseQuantity(product.id)}
            />
          )}
        </div>
      </div>

      <div className="pt-1">
        <CategoryBadge name={product.category} />

        <Link to={`/products/${product.id}`}>
          <h2 className="mt-1 font-semibold text-[#260f08] hover:underline">
            {product.name}
          </h2>
        </Link>

        <p className="mt-1 font-semibold text-[#c73a0f]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}

export default ProductCard
