import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

// TODO: Create a registration form with the following fields:
// 1. Username (required, min 3 characters)
// 2. Email (required, valid email format)
// 3. Password (required, min 6 characters)
// 4. Confirm Password (required, must match password)
// 5. Submit button that validates all fields
// 6. Display error messages for invalid fields
// 7. Show success alert when form is valid

function Exercise4() {
  // TODO: Add useState for form data
  // TODO: Add useState for errors

  // TODO: Implement handleChange function
  const handleChange = (field, value) => {
    // Your code here
  };

  // TODO: Implement validate function
  const validate = () => {
    // Your code here
    // Return true if valid, false otherwise
    return false;
  };

  // TODO: Implement handleSubmit function
  const handleSubmit = () => {
    // Your code here
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Registration Form Exercise</Text>

        {/* TODO: Add Username field */}
        
        {/* TODO: Add Email field */}
        
        {/* TODO: Add Password field */}
        
        {/* TODO: Add Confirm Password field */}
        
        {/* TODO: Add Submit button */}
      </ScrollView>
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
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  // TODO: Add your styles here
});

export default Exercise4;

