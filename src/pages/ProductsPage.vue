<template>
  <div class="products-page">
    <h1 class="page-title">Products</h1>
    <div class="header">
      <router-link to="/product/add" class="add-btn" @click="handleAddProductClick">
        + Add Product
      </router-link>
    </div>
    <Search />
  </div>
</template>

<script setup>
import Search from '../components/Search.vue';
import { useProducts } from '../composables/useProducts';
import { logger } from '../utils/logger';

const { products } = useProducts();

const handleAddProductClick = () => {
  logger.info('Navigating to add product form', {
    from: '/',
    to: '/product/add',
    navigation_type: 'add_new_product'
  });
};

logger.info('Products page loaded', {
  totalProducts: products.value.length
});
</script>
