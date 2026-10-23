
interface QuantityStepperProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityStepperProps) {
  return (
    <div
      className="flex w-44 items-center justify-between rounded-full
        bg-[#c73a0f] px-4 py-3 text-white"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrease}
        className="flex h-5 w-5 items-center justify-center
          rounded-full border border-white transition-colors
          hover:bg-white hover:text-[#c73a0f]"
      >
        −
      </button>

      <span className="text-sm font-semibold">{quantity}</span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        className="flex h-5 w-5 items-center justify-center
          rounded-full border border-white transition-colors
          hover:bg-white hover:text-[#c73a0f]"
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper
