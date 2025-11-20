# Product Management App (Vue.js)

A simple Vue.js 3 app to search,view and edit products using mock JSON data.  

## Features

- **Product List & Search**
- Real-time search across multiple fields (`name`, `tagline`, `description`)
- Debounced input for lag-free typing experience
- Instant results with performance optimizations
- "No results" state with user-friendly messaging

- **Product Details**
  - View full product info
  - Navigate back to the list

- **Edit Product**
  - Inline validation for required fields
  - Save updates (currently shows alert)

- **Add New Products**
  - Click "Add Product" button from products page
  - Fill out the form with all required fields
  - Submit to create new product

- **Logging**
  The app includes a logger utility that tracks:
  - Button clicks and navigation
  - Form submissions
  - Errors and exceptions
  This logging helps trace actions and debug issues during development or testing.

## Project Structure

```
src/
├── components/           # Vue Components
│   ├── Search.vue    
│   ├── ProductDetails.vue 
│   ├── ProductForm.vue  
│   └── ProductCard.vue  
├── composables/          # Composition API utilities
│   ├── useProducts.js  
│   ├── useDebounce.js  
│   ├── useTruncateHTML.js 
│   └── useValidation.js 
├── assets/css/          # Component-specific styles
│   ├── ProductsPage.css    
│   ├── ProductDetails.css 
│   ├── ProductForm.css 
│   └── ProductCard.css         
├── utils/               # Utility functions
│   ├── logger.js        
│   └── utils.js        
├── api/mock/            # Mock data
│   └── products.json    # Sample product data 
├── pages/               # Pages
│   ├── ProductsPage.vue 
│   ├── ProductDetailsPage.vue 
│   ├── EditProductPage.vue 
│   ├── AddProductPage.vue 
└── router/              # Vue Router configuration
    └── index.js         
```
## **Getting Started**

### **Prerequisites**
- Node.js >= 18
- npm >= 9

## Installation
1. **go to repository**
```bash
cd Product-management-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
#Open browser to ex. http://localhost:5173
```


## 🎮 Usage

### **Search Products**
1. Navigate to the search page
2. Use the search bar to find products
3. Results appear instantly with debounced search

### **View Product Details**
1. Click on any product card
2. View product information
3. Navigate using the "Back" button
4. Use "Edit Product" button to modify details

### **Edit Products**
1. Click "Edit Product" from product details
2. Modify form fields with real-time validation
3. Save changes or cancel to return

### **Add New Products**
1. Click "Add Product" button from products page
2. Fill out the form with all required fields
3. Submit to create new product

**Notes**
This app uses mock JSON data (products.json)
Default page: Products Search page
Logger utility ensures all key actions and errors are tracked

