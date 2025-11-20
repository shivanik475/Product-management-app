<template>
  <div class="card">
    <h3>{{ product.name }}</h3>
    <img
      :src="product.logoLocation"
      :alt="product.name"
      width="320"
      height="120"
      fetchpriority="high"
    />
    <router-link :to="`/product/${product.id}`">More Details</router-link>
  </div>
</template>

<script setup>
import "../assets/css/ProductCard.css";

defineProps({
  product: { type: Object, required: true },
});
</script>