<template>
  <div class="search-container">
    <input class="search-input" v-model="search" placeholder="Search product..." />
    <p v-if="filteredProducts.length === 0" class="no-results">No products found</p>
    <div class="products-grid">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import ProductCard from "./ProductCard.vue";
import useDebounce from "../composables/useDebounce";
import { useProducts } from "../composables/useProducts";

const { products, searchProducts } = useProducts();
const search = ref("");
const debouncedSearch = useDebounce(search, 300);

const filteredProducts = computed(() => searchProducts(debouncedSearch.value));

// Preload first 3 visible product images
watch(filteredProducts, (newProducts) => {
  newProducts.slice(0, 3).forEach(p => {
    if (p.logoLocation) {
      const img = new Image();
      img.src = p.logoLocation;
    }
  });
});
</script>

<style scoped>
@import "../assets/css/ProductsPage.css";
</style>
