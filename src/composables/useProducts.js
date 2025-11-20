import { ref, computed } from "vue";
import productsData from "../api/mock/products.json";

const productMap = new Map();
const products = ref(productsData.products || []);

// Map product by ID for fast access
if (products.value.length) {
  products.value.forEach(product => {
    productMap.set(String(product.id), product);
  });
}

// Preload first product image + preload next 2 images
function optimizeImageLoading() {
  if (!products.value.length) return;

  const firstProduct = products.value[0];
  if (!firstProduct.logoLocation) return;

  // Preload first product image
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = firstProduct.logoLocation;
  link.fetchPriority = "high";
  document.head.appendChild(link);

  // Preload next 2 images without high priority
  products.value.slice(1, 3).forEach(p => {
    if (p.logoLocation) {
      const img = new Image();
      img.src = p.logoLocation;
    }
  });
}

export function useProducts() {
  optimizeImageLoading();

  const getProductById = (id) => {
    const product = productMap.get(String(id));
    return computed(() => product);
  };

  const searchProducts = (query) => {
    if (!query || !query.trim()) return products.value;
    
    const normalizedQuery = query.trim().toLowerCase();
    return products.value.filter(product => 
      product.name?.toLowerCase().includes(normalizedQuery) ||
      product.productTagline?.toLowerCase().includes(normalizedQuery) ||
      product.shortDescription?.toLowerCase().includes(normalizedQuery)
    );
  };

  return {
    products,
    getProductById,
    searchProducts
  };
}
