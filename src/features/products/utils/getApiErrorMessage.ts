
import axios from 'axios'

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status

    if (status === 400) {
      return 'The submitted data is invalid.'
    }

    if (status === 404) {
      return 'The requested product was not found.'
    }

    if (status === 409) {
      return 'A product with this information already exists.'
    }

    if (status !== undefined && status >= 500) {
      return 'The server encountered an error. Please try again later.'
    }

    if (!error.response) {
      return 'Could not connect to the server. Check your connection.'
    }
  }

  return fallback
}
