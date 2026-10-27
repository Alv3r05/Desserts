
import { useCartStore } from '../features/cart/stores/cartStore'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

function CartDrawer({
  isOpen,
  onClose,
  onConfirm,
}: CartDrawerProps) {
  const items = useCartStore((state) => state.items)
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  )
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  )
  const removeItem = useCartStore((state) => state.removeItem)

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2
            id="cart-title"
            className="text-2xl font-bold text-[#260f08]"
          >
            Your Cart ({totalItems})
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full px-3 py-1 text-2xl text-[#87635a] hover:bg-[#fcf8f5]"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10 text-center">
            <span className="text-5xl" aria-hidden="true">
              🧁
            </span>
            <p className="text-[#87635a]">
              Your cart is empty.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-[#c73a0f] px-5 py-3 font-semibold text-white hover:bg-[#a92f0c]"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 flex-1 divide-y divide-[#f0e5df]">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#260f08]">
                        {item.product.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#87635a]">
                        ${item.product.price.toFixed(2)} each
                      </p>

                      <p className="mt-1 font-semibold text-[#c73a0f]">
                        Subtotal: $
                        {(
                          item.product.price * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.product.id)
                      }
                      aria-label={`Remove ${item.product.name}`}
                      className="rounded-full border border-[#eaded7] px-3 py-1 text-sm text-[#87635a] hover:border-[#c73a0f] hover:text-[#c73a0f]"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.product.id)
                      }
                      aria-label={`Decrease ${item.product.name} quantity`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c73a0f] text-[#c73a0f] hover:bg-[#fcf8f5]"
                    >
                      −
                    </button>

                    <span className="min-w-5 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.product.id)
                      }
                      aria-label={`Increase ${item.product.name} quantity`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c73a0f] text-[#c73a0f] hover:bg-[#fcf8f5]"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#f0e5df] pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[#87635a]">
                  Order Total
                </span>

                <span className="text-2xl font-bold text-[#260f08]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={onConfirm}
                className="mt-5 w-full rounded-full bg-[#c73a0f] px-5 py-4 font-semibold text-white transition hover:bg-[#a92f0c]"
              >
                Confirm Order
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
