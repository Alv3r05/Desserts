import axios from "axios";
import { api } from "./api";
import type { Product } from "../types/product";


export interface PaginatedProductsResponse {
  data: Product[]
  pages: number
  items: number
  first: number
  last: number
  next: number | null
  prev: number | null
}

export async function getPaginatedProducts(
  page: number,
  perPage = 8,
): Promise<PaginatedProductsResponse> {
  const response = await api.get<PaginatedProductsResponse>(
    '/products',
    {
      params: {
        _page: page,
        _per_page: perPage,
      },
    },
  )

  return response.data
}

export async function getProducts(
  search = "",
  category = "",
): Promise<Product[]> {
  const params: Record<string, string> = {};

  if (category) {
    params.category = category;
  }

  const response = await api.get<Product[]>("/products", { params });

  const term = search.trim().toLowerCase();
  return term
    ? response.data.filter((p) => p.name.toLowerCase().includes(term))
    : response.data;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined;
    }

    throw error;
  }
}

export type CreateProductInput = Omit<Product, "id">;
export type UpdateProductInput = CreateProductInput;

export async function createProduct(
  product: CreateProductInput,
): Promise<Product> {
  const response = await api.post<Product>("/products", product);
  return response.data;
}

export async function updateProduct(
  id: Product["id"],
  product: UpdateProductInput,
): Promise<Product> {
  const response = await api.put<Product>(`/products/${id}`, product);
  return response.data;
}

export async function deleteProduct(id: Product["id"]): Promise<void> {
  await api.delete(`/products/${id}`);
}
