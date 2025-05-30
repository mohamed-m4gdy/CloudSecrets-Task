import { ref } from 'vue'

interface FetchOptions {
  endpoint: string
  params?: Record<string, string | number>
}

export const useFetchHock = <T = unknown>() => {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchHock = async ({ endpoint, params }: FetchOptions) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = params
        ? new URLSearchParams(params as Record<string, string>).toString()
        : ''
      const url = `https://fakestoreapi.com${endpoint}${queryParams ? `?${queryParams}` : ''}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      data.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    fetchHock,
  }
}
