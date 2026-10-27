
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export interface Category {
  id: string
  name: string
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>('/categories')
  return response.data
}
