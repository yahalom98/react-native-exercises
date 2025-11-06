import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
function ProductListScreen({ navigation }) {
  // Your code here
  return null;
}

// TODO: Create ProductDetailScreen component
function ProductDetailScreen({ route }) {
  // Your code here
  // Hint: Use route.params to get the product data
  return null;
}

const Stack = createStackNavigator();

function Exercise1() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        {/* TODO: Add your screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Exercise1;

