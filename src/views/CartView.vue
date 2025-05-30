<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'

const cartStore = useCartStore()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8 text-primary dark:text-primary">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
      <RouterLink
        to="/"
        class="inline-block bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
      >
        Continue Shopping
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <!-- Product Image -->
            <img
              :src="item.image"
              :alt="item.title"
              class="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm"
            />

            <!-- Product Details -->
            <div class="flex-1 w-full sm:w-auto text-center sm:text-left">
              <h3 class="font-semibold text-gray-900 dark:text-white text-lg">{{ item.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">${{ item.price.toFixed(2) }}</p>

              <!-- Quantity Controls -->
              <div class="flex items-center justify-center sm:justify-start gap-3 mt-4">
                <button
                  @click="cartStore.decrementQuantity(item.id)"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-600 dark:text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <span class="w-8 text-center font-medium text-gray-900 dark:text-white">{{
                  item.quantity
                }}</span>
                <button
                  @click="cartStore.incrementQuantity(item.id)"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-600 dark:text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Remove Button -->
            <button
              @click="cartStore.removeItem(item.id)"
              class="p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Order Summary</h2>

          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span class="font-semibold text-gray-900 dark:text-white"
                >${{ cartStore.totalPrice.toFixed(2) }}</span
              >
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Shipping</span>
              <span class="font-semibold text-green-600 dark:text-green-400">Free</span>
            </div>

            <div class="border-t dark:border-gray-700 pt-4">
              <div class="flex justify-between">
                <span class="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                <span class="text-lg font-bold text-primary dark:text-primary">
                  ${{ cartStore.totalPrice.toFixed(2) }}
                </span>
              </div>
            </div>
          </div>

          <button
            class="w-full mt-6 bg-primary text-white py-3.5 rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm"
          >
            Proceed to Checkout
          </button>

          <button
            @click="cartStore.clearCart()"
            class="w-full mt-4 text-gray-600 dark:text-gray-400 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
