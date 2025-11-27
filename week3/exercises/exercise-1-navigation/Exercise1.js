import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// TODO: Create two screens: ProductListScreen and ProductDetailScreen
// ProductListScreen should display a list of products
// When a product is clicked, navigate to ProductDetailScreen with the product data as params
// ProductDetailScreen should display the product details

// Sample products data
const PRODUCTS = [
  { id: '1', name: 'Laptop', price: 999, description: 'High-performance laptop' },
  { id: '2', name: 'Phone', price: 699, description: 'Latest smartphone' },
  { id: '3', name: 'Tablet', price: 399, description: 'Portable tablet device' },
];

// TODO: Create ProductListScreen component
// Use onNavigate callback to navigate: onNavigate('product-detail', product)
function ProductListScreen({ onNavigate }) {
  // Your code here
  return null;
}

// TODO: Create ProductDetailScreen component
// Access product data via props: product prop contains the product data
function ProductDetailScreen({ product, onNavigate }) {
  // Your code here
  return null;
}

// Expo Router Stack pattern - simple state-based navigation
function Exercise1() {
  const [currentScreen, setCurrentScreen] = useState('product-list');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleNavigate = (screen, product = null) => {
    setSelectedProduct(product);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'product-detail':
        return <ProductDetailScreen product={selectedProduct} onNavigate={handleNavigate} />;
      case 'product-list':
      default:
        return <ProductListScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
    </SafeAreaProvider>
  );
}

export default Exercise1;

