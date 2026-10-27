
import { useCartStore } from '../features/cart/stores/cartStore'

interface ConfirmOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onStartNewOrder: () => void
}

function ConfirmOrderModal({
  isOpen,
  onClose,
  onStartNewOrder,
}: ConfirmOrderModalProps) {
  const items = useCartStore((state) => state.items)

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#c73a0f] text-2xl text-white">
          ✓
        </div>

        <h2
          id="confirmation-title"
          className="text-3xl font-bold text-[#260f08]"
        >
          Order Confirmed
        </h2>

        <p className="mt-2 text-[#87635a]">
          We hope you enjoy your food!
        </p>

        <div className="mt-6 rounded-xl bg-[#fcf8f5] p-4">
          <h3 className="mb-3 font-semibold text-[#260f08]">
            Order Summary
          </h3>

          <div className="max-h-52 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between gap-3 text-sm"
              >
                <div>
                  <p className="font-medium text-[#260f08]">
                    {item.product.name}
                  </p>
                  <p className="text-[#87635a]">
                    {item.quantity} × $
                    {item.product.price.toFixed(2)}
                  </p>
                </div>

                <p className="shrink-0 font-semibold text-[#260f08]">
                  $
                  {(
                    item.product.price * item.quantity
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between border-t border-[#eaded7] pt-4">
            <span className="text-[#87635a]">Order Total</span>
            <span className="text-xl font-bold text-[#260f08]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onStartNewOrder}
          className="mt-6 w-full rounded-full bg-[#c73a0f] px-5 py-4 font-semibold text-white hover:bg-[#a92f0c]"
        >
          Start New Order
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full rounded-full px-5 py-3 font-semibold text-[#87635a] hover:bg-[#fcf8f5]"
        >
          Close
        </button>
      </section>
    </div>
  )
}

export default ConfirmOrderModal
