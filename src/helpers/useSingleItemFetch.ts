import { ref } from 'vue'

interface FetchOptions {
  endpoint: string
  id: string | number
  params?: Record<string, string | number | boolean>
}

export const useSingleItemFetch = <T = unknown>() => {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchItem = async ({ endpoint, id, params }: FetchOptions) => {
    loading.value = true
    error.value = null

    try {
      let url = `https://fakestoreapi.com${endpoint}/${id}`

      if (params) {
        const queryParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
          queryParams.append(key, String(value))
        })
        url += `?${queryParams.toString()}`
      }

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
    fetchItem,
  }
}
