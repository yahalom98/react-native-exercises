import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// TODO: Create a comprehensive app that combines multiple concepts:
// 1. Navigation between screens (use onNavigate callback)
// 2. useState, useEffect, useRef hooks
// 3. FlatList for displaying items
// 4. Form handling for adding items
// 5. Conditional rendering

// TODO: Create a ShoppingListScreen with:
// - A FlatList showing shopping items
// - Input field and button to add new items
// - Each item should be tappable to navigate to detail screen
// - Use useEffect to save items to localStorage (simulate with state)
// - Use useRef to focus the input field when component mounts

// TODO: Create an ItemDetailScreen that:
// - Receives item data as props (item prop)
// - Allows editing the item
// - Shows item details
// - Has a delete button

function ShoppingListScreen({ onNavigate, items, setItems }) {
  // TODO: Add all necessary state and refs
  // TODO: Implement addItem function
  // TODO: Implement renderItem function
  // TODO: Use useEffect for side effects
  // TODO: Use useRef for input focus

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {/* TODO: Implement your shopping list screen */}
      </View>
    </SafeAreaView>
  );
}

function ItemDetailScreen({ item, onNavigate, onUpdate, onDelete }) {
  // TODO: Get item from props
  // TODO: Implement edit and delete functionality
  // TODO: Navigate back to list after operations

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {/* TODO: Implement your item detail screen */}
      </View>
    </SafeAreaView>
  );
}

// Expo Router Stack pattern - simple state-based navigation
function Exercise6() {
  const [currentScreen, setCurrentScreen] = useState('shopping-list');
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleNavigate = (screen, item = null) => {
    setSelectedItem(item);
    setCurrentScreen(screen);
  };

  const handleUpdate = (updatedItem) => {
    setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
    handleNavigate('shopping-list');
  };

  const handleDelete = (itemId) => {
    setItems(items.filter(i => i.id !== itemId));
    handleNavigate('shopping-list');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'item-detail':
        return (
          <ItemDetailScreen
            item={selectedItem}
            onNavigate={handleNavigate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        );
      case 'shopping-list':
      default:
        return (
          <ShoppingListScreen
            onNavigate={handleNavigate}
            items={items}
            setItems={setItems}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  // TODO: Add your styles here
});

export default Exercise6;

