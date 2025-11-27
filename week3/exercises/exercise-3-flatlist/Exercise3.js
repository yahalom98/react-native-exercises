import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

// TODO: Create a todo list app with the following features:
// 1. Display a list of todos using FlatList
// 2. Add an input field and button to add new todos
// 3. Each todo item should have a delete button
// 4. Add ability to mark todos as complete/incomplete
// 5. Show count of completed vs total todos

const INITIAL_TODOS = [
  { id: '1', text: 'Learn React Native', completed: false },
  { id: '2', text: 'Build a mobile app', completed: false },
  { id: '3', text: 'Master navigation', completed: true },
];

function Exercise3() {
  // TODO: Add useState for todos
  // TODO: Add useState for input text
  
  // TODO: Implement addTodo function
  const addTodo = () => {
    // Your code here
  };

  // TODO: Implement toggleTodo function
  const toggleTodo = (id) => {
    // Your code here
  };

  // TODO: Implement deleteTodo function
  const deleteTodo = (id) => {
    // Your code here
  };

  // TODO: Implement renderItem function for FlatList
  const renderItem = ({ item }) => {
    // Your code here
    return null;
  };

  // TODO: Calculate completed count
  const completedCount = 0; // Calculate this

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Todo List Exercise</Text>
        
        {/* TODO: Add input field and add button */}
        
        {/* TODO: Display todo count */}
        <Text style={styles.count}>
          {completedCount} of {/* TODO: total count */} todos completed
        </Text>

        {/* TODO: Add FlatList to display todos */}
      </View>
    </SafeAreaView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  count: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  // TODO: Add your styles here
});

export default Exercise3;




