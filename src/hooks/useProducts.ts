
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/productService'

export function useProducts(
  search: string,
  category: string,
) {
  return useQuery({
    queryKey: ['products', search, category],
    queryFn: () => getProducts(search, category),
  })
}
