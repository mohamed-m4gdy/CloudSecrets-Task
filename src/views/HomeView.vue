<script setup lang="ts">
import HeroSection from '@/components/base/HeroSection.vue'
import ProductList from '@/components/ProductList.vue'
</script>

<template>
  <main>
    <HeroSection
      title="Welcome to CloudSecrets"
      subtitle="Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, and more."
      imageUrl="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
      buttonText="Shop Now"
      buttonLink="/"
    />
    <ProductList />
  </main>
</template>

<style lang="scss" scoped></style>
