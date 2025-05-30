<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import { useFetchHock } from '@/helpers/fetchHock'
import { useCartStore } from '@/stores/cart'
import CartPanel from './CartPanel.vue'

const isMobileMenuOpen = ref(false)
const isCartOpen = ref(false)
const { data: categories, fetchHock } = useFetchHock<string[]>()
const cartStore = useCartStore()

onMounted(async () => {
  await fetchHock({
    endpoint: '/products/categories',
  })
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Watch for menu state changes to handle body scroll
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Watch for cart state changes to handle body scroll
watch(isCartOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header class="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo and Home Link -->
        <RouterLink to="/" class="flex items-center space-x-2 shrink-0">
          <img src="@/assets/logo.svg" alt="Logo" class="h-8 w-8" />
          <span class="text-xl font-bold text-primary dark:text-primary">CloudSecrets</span>
        </RouterLink>

        <!-- Desktop Navigation Links -->
        <nav
          class="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 mx-4 overflow-x-auto"
        >
          <RouterLink
            v-for="category in categories"
            :key="category"
            :to="{ name: 'category', params: { category: category.toLowerCase() } }"
            class="text-black dark:text-white hover:opacity-80 font-bold uppercase tracking-wide whitespace-nowrap text-xs sm:text-[13px] lg:text-base"
            active-class="!text-primary"
          >
            {{ category }}
          </RouterLink>
        </nav>

        <div class="flex items-center space-x-4 shrink-0">
          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Cart Icon -->
          <button @click="isCartOpen = true" class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary dark:text-primary hover:opacity-80"
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
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-md text-primary dark:text-primary hover:opacity-80 focus:outline-none"
          >
            <div class="relative w-6 h-6">
              <span
                class="absolute block w-6 h-0.5 bg-current transform transition-all duration-300"
                :class="{
                  'rotate-45 top-3': isMobileMenuOpen,
                  'top-2': !isMobileMenuOpen,
                }"
              ></span>
              <span
                class="absolute block w-6 h-0.5 bg-current top-3 transform transition-all duration-300"
                :class="{
                  'opacity-0': isMobileMenuOpen,
                }"
              ></span>
              <span
                class="absolute block w-6 h-0.5 bg-current transform transition-all duration-300"
                :class="{
                  '-rotate-45 top-3': isMobileMenuOpen,
                  'top-4': !isMobileMenuOpen,
                }"
              ></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-black bg-opacity-50 z-40"
        @click="isMobileMenuOpen = false"
      ></div>
    </Transition>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden fixed inset-x-0 top-[72px] bg-white dark:bg-gray-900 shadow-lg z-50"
      >
        <nav class="flex flex-col space-y-4 p-4 border-t dark:border-gray-700">
          <RouterLink
            v-for="category in categories"
            :key="category"
            :to="{ name: 'category', params: { category: category.toLowerCase() } }"
            class="text-primary dark:text-primary hover:opacity-80 font-bold px-2 py-1 uppercase tracking-wide text-sm transform transition-all duration-200 hover:translate-x-2"
            active-class="!text-primary"
            @click="isMobileMenuOpen = false"
          >
            {{ category }}
          </RouterLink>
        </nav>
      </div>
    </Transition>

    <!-- Cart Panel -->
    <CartPanel :is-open="isCartOpen" @close="isCartOpen = false" />
  </header>
  <!-- Add a spacer to prevent content from hiding behind the fixed header -->
  <div class="h-[72px]"></div>
</template>

<style scoped>
.transform {
  transform-origin: center;
}

/* Add transition for mobile menu and overlay */
.md\:hidden {
  transition: all 0.3s ease-in-out;
}

/* Hide scrollbar but keep functionality */
nav {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

nav::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Add shadow effect */
header {
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.dark header {
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.3),
    0 2px 4px -2px rgb(0 0 0 / 0.3);
}
</style>
