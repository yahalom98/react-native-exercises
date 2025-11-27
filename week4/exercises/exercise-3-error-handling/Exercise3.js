import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

function Exercise3() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // TODO: Implement handle404Error function
  // Try to fetch from: https://jsonplaceholder.typicode.com/posts/99999
  // This will return a 404 error
  // Handle the error and show a user-friendly message
  // Check error.response.status to identify 404
  const handle404Error = async () => {
    // Your code here
  };

  // TODO: Implement handleNetworkError function
  // Try to fetch from an invalid URL: 'https://invalid-url-that-does-not-exist.com/api'
  // Handle network errors (error.request)
  // Show appropriate message to user
  const handleNetworkError = async () => {
    // Your code here
  };

  // TODO: Implement handleTimeoutError function
  // Make a request with a very short timeout (1ms)
  // URL: https://jsonplaceholder.typicode.com/posts/1
  // Handle timeout errors (error.code === 'ECONNABORTED')
  const handleTimeoutError = async () => {
    // Your code here
  };

  // TODO: Implement getUserFriendlyError function
  // Fetch from: https://jsonplaceholder.typicode.com/posts/99999
  // Create user-friendly error messages based on status code:
  // - 404: "The requested resource was not found"
  // - 401: "You are not authorized. Please log in"
  // - 500: "Server error. Please try again later"
  // - Default: "Something went wrong. Please try again"
  // Use Alert.alert() to show the message
  const getUserFriendlyError = async () => {
    // Your code here
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Exercise 3: Error Handling</Text>
        <Text style={styles.description}>
          Complete the TODO items to implement proper error handling.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <Text style={styles.taskItem}>1. Handle 404 errors with user-friendly message</Text>
          <Text style={styles.taskItem}>2. Handle network errors</Text>
          <Text style={styles.taskItem}>3. Handle timeout errors</Text>
          <Text style={styles.taskItem}>4. Create user-friendly error messages for different status codes</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handle404Error}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>1. Handle 404 Error</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleNetworkError}
            disabled={loading}
          >
            <Text style={styles.buttonText}>2. Handle Network Error</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleTimeoutError}
            disabled={loading}
          >
            <Text style={styles.buttonText}>3. Handle Timeout Error</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={getUserFriendlyError}
            disabled={loading}
          >
            <Text style={styles.buttonText}>4. User-Friendly Errors</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
          {result && !loading && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultType}>{result.type}</Text>
              <Text style={styles.resultText}>
                {typeof result === 'string' 
                  ? result 
                  : JSON.stringify(result, null, 2)}
              </Text>
            </View>
          )}
          {!result && !loading && (
            <Text style={styles.placeholder}>
              Click a button above to test error handling
            </Text>
          )}
        </View>
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
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#007AFF',
  },
  taskItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  resultContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
  },
  placeholder: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
});

export default Exercise3;



