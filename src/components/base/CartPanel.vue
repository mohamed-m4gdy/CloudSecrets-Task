<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const cartStore = useCartStore()

const closePanel = () => {
  emit('close')
}
</script>

<template>
  <!-- Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50"
      @click="closePanel"
    ></div>
  </Transition>

  <!-- Cart Panel -->
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-show="isOpen"
      class="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl z-50"
    >
      <div class="h-full flex flex-col">
        <!-- Cart Header -->
        <div
          class="p-6 border-b dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900"
        >
          <div>
            <h2 class="text-2xl font-bold text-primary dark:text-primary">Shopping Cart</h2>
          </div>
          <button
            @click="closePanel"
            class="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="cartStore.items.length === 0" class="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
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
            <p class="text-gray-600 dark:text-gray-400 text-lg">Your cart is empty</p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm"
              />
              <div class="flex-1 w-full sm:w-auto">
                <div class="flex justify-between items-start">
                  <h3
                    class="font-semibold text-gray-900 dark:text-white text-center sm:text-left w-full sm:w-auto"
                  >
                    {{ item.title }}
                  </h3>
                  <button
                    @click="cartStore.removeItem(item.id)"
                    class="p-1.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
                <div class="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
                  <p class="text-gray-600 dark:text-gray-400">${{ item.price.toFixed(2) }}</p>
                  <span
                    class="text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary px-2.5 py-1 rounded-full"
                  >
                    {{ item.quantity }} {{ item.quantity === 1 ? 'item' : 'items' }}
                  </span>
                </div>
                <div class="flex items-center justify-center gap-2 mt-4">
                  <button
                    @click="cartStore.decrementQuantity(item.id)"
                    class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                    class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
            </div>
          </div>
        </div>

        <!-- Cart Footer -->
        <div class="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400"
                >Items ({{ cartStore.totalItems }}):</span
              >
              <span class="font-semibold text-gray-900 dark:text-white"
                >${{ cartStore.totalPrice.toFixed(2) }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Shipping:</span>
              <span class="font-semibold text-green-600 dark:text-green-400">Free</span>
            </div>
            <div class="flex justify-between pt-3 border-t dark:border-gray-700">
              <span class="text-lg font-bold text-primary dark:text-primary">Total:</span>
              <span class="text-lg font-bold text-primary dark:text-primary">
                ${{ cartStore.totalPrice.toFixed(2) }}
              </span>
            </div>
          </div>
          <RouterLink
            to="/cart"
            class="block w-full bg-primary text-white text-center py-3.5 rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm"
            @click="closePanel"
          >
            View Cart
          </RouterLink>
        </div>
      </div>
    </div>
  </Transition>
</template>
