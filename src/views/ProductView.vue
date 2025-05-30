<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/types/product'
import { useCartStore } from '@/stores/cart'
import { useSingleItemFetch } from '@/helpers/useSingleItemFetch'

const route = useRoute()
const quantity = ref(1)
const cartStore = useCartStore()

const { data: product, loading, error, fetchItem } = useSingleItemFetch<Product>()

const fetchProduct = async () => {
  await fetchItem({
    endpoint: '/products',
    id: route.params.id as string,
  })
}

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItemWithQuantity(product.value, quantity.value)
  }
}

onMounted(fetchProduct)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"
      ></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <h2 class="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">{{ error }}</h2>
      <router-link
        to="/"
        class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </router-link>
    </div>

    <div v-else-if="product" class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div
          class="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-800 p-8 shadow-lg"
        >
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
        </div>

        <!-- Product Details -->
        <div class="flex flex-col gap-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {{ product.title }}
            </h1>
            <div class="flex items-center gap-4">
              <p class="text-3xl font-bold text-primary">${{ product.price.toFixed(2) }}</p>
              <div
                class="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full"
              >
                <span class="text-yellow-500">★</span>
                <span class="ml-1 text-sm font-medium text-yellow-700 dark:text-yellow-400">
                  {{ product.rating.rate }}
                </span>
                <span class="ml-1 text-sm text-yellow-600/70 dark:text-yellow-400/70">
                  ({{ product.rating.count }} reviews)
                </span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Category</h2>
            <router-link
              :to="`/category/${product.category}`"
              class="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="capitalize">{{ product.category }}</span>
            </router-link>
          </div>

          <!-- Quantity and Add to Cart -->
          <div class="flex flex-col gap-4 mt-4">
            <div class="flex items-center gap-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</label>
              <div
                class="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <button
                  @click="decrementQuantity"
                  class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  :disabled="quantity <= 1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <span class="px-4 py-2 text-gray-900 dark:text-white font-medium">{{
                  quantity
                }}</span>
                <button
                  @click="incrementQuantity"
                  class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button
              @click="addToCart"
              class="w-full bg-primary text-white py-4 px-6 rounded-xl font-bold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2"
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
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
