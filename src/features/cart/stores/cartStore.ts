
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '../../../types/product'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: Product['id']) => void
  increaseQuantity: (productId: Product['id']) => void
  decreaseQuantity: (productId: Product['id']) => void
  clearCart: () => void
  syncProducts: (products: Product[]) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== productId,
          ),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      // Drops products that no longer exist and refreshes the stored data of the rest
      syncProducts: (products) =>
        set((state) => {
          const byId = new Map(products.map((p) => [String(p.id), p]))
          const items = state.items.flatMap((item) => {
            const fresh = byId.get(String(item.product.id))
            return fresh ? [{ ...item, product: fresh }] : []
          })

          return JSON.stringify(items) === JSON.stringify(state.items)
            ? state
            : { items }
        }),
    }),
    {
      name: 'desserts-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
