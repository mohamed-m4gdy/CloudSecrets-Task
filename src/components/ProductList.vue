<script setup lang="ts">
import { useFetchHock } from '@/helpers/fetchHock'
import { watch, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/product'

const props = defineProps<{
  category?: string
  title?: string
}>()

const { data: products, loading, error, fetchHock } = useFetchHock<Product[]>()
const cartStore = useCartStore()

const fetchProducts = async () => {
  products.value = null
  const endpoint = props.category ? `/products/category/${props.category}` : '/products'
  await fetchHock({
    endpoint,
    params: {
      limit: 6,
    },
  })
}

watch(
  () => props.category,
  async (newCategory, oldCategory) => {
    console.log('Category changed:', newCategory, oldCategory)
    if (newCategory !== oldCategory) {
      await fetchProducts()
    }
  },
)

onMounted(async () => {
  await fetchProducts()
})

const addToCart = (product: Product) => {
  cartStore.addItem(product)
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl uppercase font-bold mb-8 text-black dark:text-primary">
      {{ title || 'Our Products' }}
    </h1>

    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 mx-auto text-red-500 dark:text-red-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p class="text-red-600 dark:text-red-400 font-medium">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="group bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/20"
      >
        <!-- Product Image -->
        <div class="relative overflow-hidden h-[200px]">
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
          ></div>
        </div>

        <!-- Product Info -->
        <div class="p-4 flex flex-col">
          <h2
            class="text-lg font-bold mb-2 line-clamp-1 text-black dark:text-primary group-hover:opacity-80 transition-all duration-300"
          >
            {{ product.title }}
          </h2>

          <div class="flex items-center justify-between mb-3">
            <p class="text-xl font-bold text-primary dark:text-primary">
              ${{ product.price.toFixed(2) }}
            </p>
            <div class="flex items-center">
              <span class="text-yellow-400">★</span>
              <span class="ml-1 font-medium text-gray-900 dark:text-white">{{
                product.rating.rate
              }}</span>
              <span class="text-gray-500 dark:text-gray-400 text-sm ml-1"
                >({{ product.rating.count }})</span
              >
            </div>
          </div>

          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {{ product.description }}
          </p>

          <!-- Buttons Container -->
          <div class="flex flex-col gap-2 mt-auto">
            <button
              @click="addToCart(product)"
              class="flex-1 bg-primary dark:bg-primary/80 text-white py-2 px-4 rounded-lg font-bold hover:bg-opacity-90 dark:hover:bg-primary/70 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Add to Cart</span>
            </button>
            <router-link
              :to="`/product/${product.id}`"
              class="flex-1 bg-white dark:bg-gray-800 text-primary border-2 border-primary py-2 px-4 rounded-lg font-bold hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center"
            >
              View Product
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
