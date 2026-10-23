import { useState } from 'react'

import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import ConfirmOrderModal from './components/ConfirmOrderModal'

import { products } from './data/products'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleConfirm = () => {
    setIsCartOpen(false)
    setIsConfirmOpen(true)
  }

  const handleNewOrder = () => {
    setIsConfirmOpen(false)
  }

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-6 py-8
      md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <Header />

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open shopping cart"
            className="flex items-center gap-2 rounded-full
              border border-[#ad6250] bg-white px-4 py-3
              font-semibold text-[#260f08] transition-colors
              hover:border-[#c73a0f] hover:text-[#c73a0f]"
          >
            <span aria-hidden="true">🛒</span>
            <span>Cart (0)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-8
          lg:grid-cols-[minmax(0,1fr)_320px]">

          <section aria-label="Dessert products">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#260f08]">
                Desserts
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8
              sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </section>

          <aside className="rounded-xl bg-white p-6">
            <h2 className="text-2xl font-bold text-[#c73a0f]">
              Your Cart (0)
            </h2>

            <div className="flex flex-col items-center py-8 text-center">
              <span className="mb-4 text-5xl" aria-hidden="true">
                🍰
              </span>

              <p className="text-sm text-[#87635a]">
                Your added items will appear here
              </p>
            </div>
          </aside>
        </div>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onConfirm={handleConfirm}
      />

      <ConfirmOrderModal
        isOpen={isConfirmOpen}
        onClose={handleNewOrder}
      />
    </main>
  )
}

export default App
