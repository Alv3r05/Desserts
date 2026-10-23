import Header from './components/Header'
import ProductCard from './components/ProductCard'
import { products } from './data/products'

function App() {
  return (
    <main className="min-h-screen bg-[#fcf8f5] px-6 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <Header />

        <section
          aria-label="Dessert products"
          className="grid grid-cols-1 gap-x-6 gap-y-8
            sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </section>
      </div>
    </main>
  )
}

export default App
