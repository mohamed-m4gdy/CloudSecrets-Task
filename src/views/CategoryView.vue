<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductList from '@/components/ProductList.vue'
import HeroSection from '@/components/base/HeroSection.vue'

const route = useRoute()
const category = ref(route.params.category as string)

// Dynamic category content
const categoryContent = computed(() => {
  // Format category name for display
  const formatCategory = (cat: string) => {
    return cat
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Get a random product image from the category
  const getRandomImage = () => {
    const images = {
      electronics: [
        'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      ],
      jewelery: [
        'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
        'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
        'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
      ],
      "men's clothing": [
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      ],
      "women's clothing": [
        'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
        'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
        'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
      ],
    }

    const categoryImages = images[category.value as keyof typeof images] || [
      'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    ]
    return categoryImages[Math.floor(Math.random() * categoryImages.length)]
  }

  return {
    title: `${formatCategory(category.value)} Collection`,
    subtitle: `Discover our amazing ${formatCategory(category.value).toLowerCase()} collection. Find the perfect items that match your style and needs.`,
    imageUrl: getRandomImage(),
    // No button when already in category
    buttonText: undefined,
    buttonLink: undefined,
  }
})

watch(
  () => route.params.category,
  (newCategory) => {
    category.value = newCategory as string
  },
)
</script>

<template>
  <div>
    <HeroSection
      :title="categoryContent.title"
      :subtitle="categoryContent.subtitle"
      :imageUrl="categoryContent.imageUrl"
      :buttonText="categoryContent.buttonText"
      :buttonLink="categoryContent.buttonLink"
    />
    <ProductList :category="category" :title="categoryContent.title" />
  </div>
</template>
