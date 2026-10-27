
import { useEffect } from 'react'
import type { Product } from '../../../types/product'

interface DeleteProductModalProps {
  product: Product | null
  isDeleting: boolean
  onClose: () => void
  onConfirm: () => void
}

function DeleteProductModal({
  product,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
  useEffect(() => {
    if (!product) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isDeleting) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [product, isDeleting, onClose])

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isDeleting) {
          onClose()
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="delete-dialog-title"
          className="text-xl font-bold text-[#260f08]"
        >
          Delete Product
        </h2>

        <p className="mt-3 text-[#87635a]">
          Are you sure you want to delete{' '}
          <strong>{product.name}</strong>? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-full border border-[#d9c8c4] px-5 py-2 font-medium text-[#260f08] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-full bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteProductModal
