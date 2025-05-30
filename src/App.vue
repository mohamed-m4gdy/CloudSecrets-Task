<script setup lang="ts">
import './assets/base.css'
import './assets/main.css'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/base/AppHeader.vue'
import AppFooter from '@/components/base/AppFooter.vue'
import { onMounted, watch } from 'vue'
import MoveToTop from '@/components/base/MoveToTop.vue'

// Watch for dark mode changes
watch(
  () => document.documentElement.classList.contains('dark'),
  (isDark) => {
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#1f2937' : '#ffffff')
    }
  },
)

// Initialize theme on mount
onMounted(() => {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
    <AppHeader />
    <main class="flex-grow">
      <RouterView />
    </main>
    <AppFooter />
    <MoveToTop />
  </div>
</template>
