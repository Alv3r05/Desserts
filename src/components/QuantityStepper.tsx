
function QuantityStepper() {
  return (
    <div
      className="flex items-center justify-between rounded-full
        bg-[#c73a0f] px-3 py-2 text-white"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className="flex h-5 w-5 items-center justify-center
          rounded-full border border-white transition-colors
          hover:bg-white hover:text-[#c73a0f]"
      >
        −
      </button>

      <span className="text-sm font-semibold">1</span>

      <button
        type="button"
        aria-label="Increase quantity"
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
