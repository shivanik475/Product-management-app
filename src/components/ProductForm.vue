<template>
  <div class="form-container">
    <h2>{{ isEdit ? 'Edit Product' : 'Add Product' }}</h2>

    <form @submit.prevent="handleSubmit" class="form">

      <!-- ID (edit only) -->
      <div class="form-field" v-if="isEdit">
        <label for="product-id">ID</label>
        <input
          id="product-id"
          type="number"
          :value="formData.id"
          disabled
          class="form-input form-input--disabled"
        />
      </div>

      <!-- Name -->
      <div class="form-field">
        <label for="product-name">Name *</label>
        <input
          id="product-name"
          type="text"
          v-model="formData.name"
          @input="handleInput('name', $event.target.value)"
          :class="['form-input', { 'form-input--error': errors.name }]"
        />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>

      <!-- GVT ID -->
      <div class="form-field">
        <label for="gvt-id">GVT ID *</label>
        <input
          id="gvt-id"
          type="text"
          v-model="formData.gvtId"
          @input="handleInput('gvtId', $event.target.value)"
          :class="['form-input', { 'form-input--error': errors.gvtId }]"
        />
        <p v-if="errors.gvtId" class="error">{{ errors.gvtId }}</p>
      </div>

      <!-- Product Tagline -->
      <div class="form-field">
        <label for="product-tagline">Product Tagline *</label>
        <input
          id="product-tagline"
          type="text"
          v-model="formData.productTagline"
          @input="handleInput('productTagline', $event.target.value)"
          :class="['form-input', { 'form-input--error': errors.productTagline }]"
        />
        <p v-if="errors.productTagline" class="error">{{ errors.productTagline }}</p>
      </div>

      <!-- Product URL -->
      <div class="form-field">
        <label for="product-url">Product URL *</label>
        <input
          id="product-url"
          type="text"
          v-model="formData.productUrl"
          @input="handleInput('productUrl', $event.target.value)"
          :class="['form-input', { 'form-input--error': errors.productUrl }]"
          placeholder="/ca/game-of-sultans"
        />
        <p v-if="errors.productUrl" class="error">{{ errors.productUrl }}</p>
      </div>

      <!-- Order URL -->
      <div class="form-field">
        <label for="order-url">Order URL *</label>
        <input
          id="order-url"
          type="url"
          v-model="formData.orderUrl"
          @input="handleInput('orderUrl', $event.target.value)"
          :class="['form-input', { 'form-input--error': errors.orderUrl }]"
          placeholder="https://example.com/order"
        />
        <p v-if="errors.orderUrl" class="error">{{ errors.orderUrl }}</p>
      </div>

      <!-- Short Description -->
      <div class="form-field">
        <label for="short-desc">Short Description *</label>
        <textarea
          id="short-desc"
          v-model="formData.shortDescription"
          @input="handleInput('shortDescription', $event.target.value)"
          :class="['form-textarea', { 'form-textarea--error': errors.shortDescription }]"
          rows="3"
        ></textarea>
        <p v-if="errors.shortDescription" class="error">{{ errors.shortDescription }}</p>
      </div>

      <!-- Long Description -->
      <div class="form-field">
        <label for="long-desc">Long Description *</label>
        <textarea
          id="long-desc"
          v-model="formData.longDescription"
          @input="handleInput('longDescription', $event.target.value)"
          :class="['form-textarea', { 'form-textarea--error': errors.longDescription }]"
          rows="5"
        ></textarea>
        <p v-if="errors.longDescription" class="error">{{ errors.longDescription }}</p>
      </div>

      <!-- Logo URL -->
      <div class="form-field">
        <label for="logo-url">Logo URL</label>
        <input
          id="logo-url"
          type="url"
          v-model="formData.logoLocation"
          @input="handleInput('logoLocation', $event.target.value)"
          class="form-input"
          placeholder="https://example.com/image.jpg"
        />
        <p v-if="errors.logoLocation" class="error">{{ errors.logoLocation }}</p>
      </div>

      <!-- Min/Max Amount -->
      <div class="form-row">
        <div class="form-field">
          <label for="min-amount">Min Amount</label>
          <input
            id="min-amount"
            type="text"
            v-model="formData.variableDenomPriceMinAmount"
            @input="handleInput('variableDenomPriceMinAmount', $event.target.value)"
            class="form-input"
          />
        </div>
        <div class="form-field">
          <label for="max-amount">Max Amount</label>
          <input
            id="max-amount"
            type="text"
            v-model="formData.variableDenomPriceMaxAmount"
            @input="handleInput('variableDenomPriceMaxAmount', $event.target.value)"
            class="form-input"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="form-actions">
        <button type="submit" class="save-btn" :disabled="!isFormValid">
          {{ isEdit ? 'Save Changes' : 'Add Product' }}
        </button>
        <button type="button" class="cancel-btn" @click="handleCancel">
          Cancel
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useValidation } from "../composables/useValidation";
import { logger } from "../utils/logger";

const props = defineProps({
  product: { type: Object, default: null },
});

const router = useRouter();
const isEdit = computed(() => !!props.product);

const formData = reactive({
  id: props.product?.id || '',
  name: props.product?.name || '',
  gvtId: props.product?.gvtId || '',
  productTagline: props.product?.productTagline || '',
  productUrl: props.product?.productUrl || '',
  orderUrl: props.product?.orderUrl || '',
  shortDescription: props.product?.shortDescription || '',
  longDescription: props.product?.longDescription || '',
  logoLocation: props.product?.logoLocation || '',
  variableDenomPriceMinAmount: props.product?.variableDenomPriceMinAmount || '',
  variableDenomPriceMaxAmount: props.product?.variableDenomPriceMaxAmount || '',
});

const requiredFields = ['name','gvtId','productTagline','productUrl','orderUrl','shortDescription','longDescription'];
const limits = { name:50, productTagline:100 };
const numberFields = ['gvtId','variableDenomPriceMinAmount','variableDenomPriceMaxAmount'];

const { validateField } = useValidation(requiredFields, limits, numberFields);
const errors = reactive({});

// handle input changes
const handleInput = (name, value) => {
  formData[name] = value;

  // validate numeric and length
  if (!validateField(name, value)) {
    errors[name] = `Invalid ${name}`;
  } 
  // check required field
  else if (requiredFields.includes(name) && !String(value ?? '').trim()) {
    errors[name] = "This field is required";
  } 
  else {
    errors[name] = '';
  }
};

// computed property for overall form validity
const isFormValid = computed(() => {
  const requiredValid = requiredFields.every(f => String(formData[f] ?? '').trim());
  const noErrors = Object.values(errors).every(e => !e);
  return requiredValid && noErrors;
});

// submit handler
const handleSubmit = () => {
  logger.info("Form submission clicked...");

  if (!isFormValid.value) return;

  try {
    if (isEdit.value) {
      logger.success('Product updated successfully', { productId: formData.id });
      alert('Product updated successfully!');
    } else {
      const newProductId = Date.now();
      formData.id = newProductId;
      logger.success('New product created successfully', { productId: newProductId, productName: formData.name });
      alert('Product added successfully!');
    }
    router.push('/');
  } catch (error) {
    logger.error('Form submission failed', { error });
    alert('An error occurred. Please try again.');
  }
};

const handleCancel = () => { 
  logger.info('Clicked cancel button');
  router.back();
};
</script>

<style scoped>
@import "../assets/css/ProductForm.css";
</style>
