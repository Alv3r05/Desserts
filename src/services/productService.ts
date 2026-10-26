import axios from "axios";
import type { Product } from "../types/product";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function getProducts(
  search = "",
  category = "",
): Promise<Product[]> {
  const params: Record<string, string> = {};

  if (category) {
    params.category = category;
  }

  const [response] = await Promise.all([
    api.get<Product[]>("/products", { params }),
    delay(1200),
  ]);

  const term = search.trim().toLowerCase();
  return term
    ? response.data.filter((p) => p.name.toLowerCase().includes(term))
    : response.data;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await delay(1200);

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
