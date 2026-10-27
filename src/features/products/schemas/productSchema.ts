
import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'The name must contain at least 3 characters.')
    .max(100, 'The name cannot exceed 100 characters.'),

  category: z
    .string()
    .min(1, 'Please select a category.'),

  price: z
    .number({ error: 'The price must be a number.' })
    .positive('The price must be greater than zero.')
    .finite('The price must be a valid number.'),

  image: z
    .string()
    .trim()
    .min(1, 'Please provide an image URL.'),
})

export type ProductFormValues = z.infer<typeof productSchema>
