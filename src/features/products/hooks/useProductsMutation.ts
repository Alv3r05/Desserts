
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../services/productService'
import type {
  CreateProductInput,
  UpdateProductInput,
} from '../../../services/productService'
import type { Product } from '../../../types/product'

export function useProductsMutations() {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (product: CreateProductInput) =>
      createProduct(product),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: Product['id']
      product: UpdateProductInput
    }) => updateProduct(id, product),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      await queryClient.invalidateQueries({
        queryKey: ['product'],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: Product['id']) => deleteProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      await queryClient.invalidateQueries({
        queryKey: ['product'],
      })
    },
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
