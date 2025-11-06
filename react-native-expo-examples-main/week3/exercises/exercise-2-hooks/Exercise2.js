import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

// TODO: Create a counter component with the following features:
// 1. Display a count that starts at 0
// 2. Add buttons to increment and decrement the count
// 3. Add a reset button that sets count back to 0
// 4. Use useEffect to log the count value to console every time it changes
// 5. Display a message when count reaches 10: "You've reached 10!"

function Exercise2() {
  // TODO: Add useState for count
  // TODO: Add useEffect to log count changes
  
  // TODO: Implement increment function
  const increment = () => {
    // Your code here
  };

  // TODO: Implement decrement function
  const decrement = () => {
    // Your code here
  };

  // TODO: Implement reset function
  const reset = () => {
    // Your code here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Counter Exercise</Text>
        
        {/* TODO: Display count */}
        {/* TODO: Add increment, decrement, and reset buttons */}
        {/* TODO: Conditionally render message when count is 10 */}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  // TODO: Add your styles here
});

export default Exercise2;

