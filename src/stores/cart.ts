import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/types/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<CartItem[]>([])
    const isLoading = ref(false)

    // Computed property for total price
    const totalPrice = computed(() => {
      return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
    })

    // Computed property for total items
    const totalItems = computed(() => {
      return items.value.reduce((total, item) => total + item.quantity, 0)
    })

    // Add item to cart with quantity
    const addItemWithQuantity = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
      const existingItem = items.value.find((i) => i.id === item.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        items.value.push({ ...item, quantity })
      }
    }

    // Add item to cart (default quantity: 1)
    const addItem = (item: Omit<CartItem, 'quantity'>) => {
      addItemWithQuantity(item, 1)
    }

    // Remove item from cart
    const removeItem = (itemId: number) => {
      const index = items.value.findIndex((item) => item.id === itemId)
      if (index > -1) {
        items.value.splice(index, 1)
      }
    }

    // Increment item quantity
    const incrementQuantity = (itemId: number) => {
      const item = items.value.find((i) => i.id === itemId)
      if (item) {
        item.quantity++
      }
    }

    // Decrement item quantity
    const decrementQuantity = (itemId: number) => {
      const item = items.value.find((i) => i.id === itemId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          removeItem(itemId)
        }
      }
    }

    // Clear cart
    const clearCart = () => {
      items.value = []
    }

    return {
      items,
      isLoading,
      totalPrice,
      totalItems,
      addItem,
      addItemWithQuantity,
      removeItem,
      incrementQuantity,
      decrementQuantity,
      clearCart,
    }
  },
  {
    persist: true,
  },
)
