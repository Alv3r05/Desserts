
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
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 h-full w-full
          cursor-default bg-black/40"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute right-0 top-0 flex h-full w-full
          max-w-md flex-col bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2
            id="cart-title"
            className="text-2xl font-bold text-[#c73a0f]"
          >
            Your Cart (0)
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full px-3 py-1 text-2xl
              text-[#87635a] transition-colors hover:bg-[#fcf8f5]"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center
          justify-center text-center">
          <div className="mb-4 text-6xl" aria-hidden="true">
            🍰
          </div>

          <p className="text-sm text-[#87635a]">
            Your added items will appear here
          </p>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          className="w-full rounded-full bg-[#c73a0f] px-4 py-3
            font-semibold text-white transition-colors
            hover:bg-[#a92f0c]"
        >
          Confirm Order
        </button>
      </aside>
    </div>
  )
}

export default CartDrawer
