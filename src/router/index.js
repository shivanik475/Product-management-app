import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '../pages/ProductsPage.vue';
import ProductDetailsPage from '../pages/ProductDetailsPage.vue';
import AddProductPage from '../pages/AddProductPage.vue'; 
// Lazy load EditProductPage
const EditProductPage = () => import('../pages/EditProductPage.vue');

const routes = [
  { path: '/', name: 'Products', component: ProductsPage },
  { path: '/product/add', name: 'AddProduct', component: AddProductPage },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetailsPage },
  { path: '/product/:id/edit', name: 'EditProduct', component: EditProductPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
