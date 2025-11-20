<template>
  <div class="details-container" v-if="product">
    <button class="back-btn" @click="handleBack">← Back</button>

    <h2 class="product-title">{{ product.name }}</h2>
    <h3 class="product-id">ID: {{ product.id }}</h3>
    <h3 class="product-id">GVT ID: {{ product.gvtId }}</h3>

    <img
      class="product-image"
      :src="product.logoLocation"
      :alt="product.name"
    />

    <h3>Product URL:</h3>
    <a :href="product.productUrl" target="_blank">{{ product.productUrl }}</a>

    <h3>Order URL:</h3>
    <a :href="product.orderUrl" target="_blank">{{ product.orderUrl }}</a>

    <h3>Short Description</h3>
    <p v-html="shortDescDisplay"></p>
    <p
      v-if="shortShowToggle"
      class="toggle-btn"
      @click="showFullShort = !showFullShort"
    >
      {{ showFullShort ? "Show Less" : "... Show More" }}
    </p>

    <h3>Long Description</h3>
    <p v-html="longDescDisplay"></p>
    <p
      v-if="longShowToggle"
      class="toggle-btn"
      @click="showFullLong = !showFullLong"
    >
      {{ showFullLong ? "Show Less" : "... Show More" }}
    </p>

    <button class="edit-btn" @click="editProduct">Edit Product</button>
  </div>

  <h2 class="not-found" v-else>Product not found</h2>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProducts } from "../composables/useProducts";
import { useTruncateHTML } from "../composables/useTruncateHTML";
import { handleBackNavigation } from "../utils/utils";
import { logger } from "../utils/logger";

const { getDisplayHTML, truncateHTML } = useTruncateHTML();
const { getProductById } = useProducts();

const route = useRoute();
const router = useRouter();
const productId = route.params.id;

const product = getProductById(productId);

const showFullShort = ref(false);
const showFullLong = ref(false);

onMounted(() => {
  logger.info('Component mounted!', { component: 'ProductDetails' });
});

const shortDescDisplay = computed(() =>
  getDisplayHTML(product.value?.shortDescription || "", showFullShort.value, 2)
);

const shortShowToggle = computed(() => {
  if (!product.value) return false;
  const truncated = truncateHTML(product.value.shortDescription, 2);
  return product.value.shortDescription.length > truncated.length;
});

const longDescDisplay = computed(() => {
  if (!product.value) return "";
  return showFullLong.value
    ? product.value.longDescription
    : truncateHTML(product.value.longDescription, 3);
});

const longShowToggle = computed(() => {
  if (!product.value) return false;
  return product.value.longDescription.length > truncateHTML(product.value.longDescription, 3).length;
});

const handleBack = () => {
  logger.info("back button clicked")
  handleBackNavigation(router)
};

const editProduct = () => {
  const editRoute = `/product/${productId}/edit`;
  logger.info('Edit Product initiated', {
    productId,
    productName: product.value?.name,
  });

  try {
    router.push(editRoute);
    logger.info('Navigation to edit page successful', { productId, editRoute });
  } catch (error) {
    logger.error('Navigation to edit page failed', { productId, editRoute, error: error.message });
  }
};
</script>

<style scoped>
@import "../assets/css/ProductDetails.css";
</style>