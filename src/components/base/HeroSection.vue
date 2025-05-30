<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  imageUrl: string
  buttonText?: string
  buttonLink?: string
}>()
</script>

<template>
  <section class="relative bg-white dark:bg-gray-900 overflow-hidden">
    <!-- Decorative Background Shapes -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
    ></div>

    <div class="container mx-auto px-4 py-12 md:py-20">
      <div class="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <!-- Text Content -->
        <div class="flex-1 text-center md:text-left">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black dark:text-white leading-tight"
          >
            {{ title }}
          </h1>
          <p
            class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0"
          >
            {{ subtitle }}
          </p>
          <RouterLink
            v-if="buttonText && buttonLink"
            :to="buttonLink"
            class="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {{ buttonText }}
          </RouterLink>
        </div>

        <!-- Image -->
        <div class="flex-1 relative">
          <div class="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <img
              :src="imageUrl"
              :alt="title"
              class="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <!-- Decorative Elements -->
            <div
              class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-3xl"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave Decoration -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg
        class="w-full h-auto"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
          fill="currentColor"
          class="text-gray-100 dark:text-gray-800"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Add smooth transitions for dark mode */
section {
  transition: background-color 0.3s ease;
}

/* Add hover effect for the image */
img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.02);
}
</style>
