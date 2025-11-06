import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';

// TODO: Create a comprehensive app that combines multiple concepts:
// 1. Navigation between screens
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
// - Receives item data as navigation params
// - Allows editing the item
// - Shows item details
// - Has a delete button

function ShoppingListScreen({ navigation }) {
  // TODO: Add all necessary state and refs
  // TODO: Implement addItem function
  // TODO: Implement renderItem function
  // TODO: Use useEffect for side effects
  // TODO: Use useRef for input focus

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* TODO: Implement your shopping list screen */}
      </View>
    </SafeAreaView>
  );
}

function ItemDetailScreen({ route, navigation }) {
  // TODO: Get item from route.params
  // TODO: Implement edit and delete functionality
  // TODO: Navigate back to list after operations

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* TODO: Implement your item detail screen */}
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function Exercise6() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShoppingList">
        <Stack.Screen
          name="ShoppingList"
          component={ShoppingListScreen}
          options={{ title: 'Shopping List' }}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetailScreen}
          options={{ title: 'Item Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

