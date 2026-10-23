
interface ConfirmOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

function ConfirmOrderModal({
  isOpen,
  onClose,
}: ConfirmOrderModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center
      justify-center overflow-y-auto bg-black/50 p-4">

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        className="my-auto w-full max-w-lg rounded-xl bg-white p-6
          shadow-2xl sm:p-8"
      >
        <div className="mb-5 flex h-12 w-12 items-center
          justify-center rounded-full bg-green-100 text-2xl
          text-green-700"
          aria-hidden="true"
        >
          ✓
        </div>

        <h2
          id="confirmation-title"
          className="text-3xl font-bold text-[#260f08]"
        >
          Order Confirmed
        </h2>

        <p className="mt-3 text-[#87635a]">
          We hope you enjoy your food!
        </p>

        <div className="mt-6 rounded-lg bg-[#fcf8f5] p-5">
          <p className="text-center text-sm text-[#87635a]">
            Image
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-[#c73a0f]
            px-4 py-3 font-semibold text-white
            transition-colors hover:bg-[#a92f0c]"
        >
          Start New Order
        </button>
      </section>
    </div>
  )
}

export default ConfirmOrderModal
