<!-- EditProduct.vue -->
<template>
  <div>
    <ProductForm :product="product" mode="edit" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useProducts } from "../composables/useProducts";
import ProductForm from "../components/ProductForm.vue";

const route = useRoute();
const { getProductById } = useProducts();
const productId = route.params.id;

const product = getProductById(productId).value;
</script>
