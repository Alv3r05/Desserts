
import { useQuery } from '@tanstack/react-query'
import {
  getProducts,
  getPaginatedProducts,
} from '../../../services/productService'

export function useAllProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })
}

export function usePaginatedProducts(page: number) {
  return useQuery({
    queryKey: ['products', 'paginated', page],
    queryFn: () => getPaginatedProducts(page, 8),
    placeholderData: (previousData) => previousData,
  })
}
