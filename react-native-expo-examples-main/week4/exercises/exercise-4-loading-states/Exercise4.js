import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

function Exercise4() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  // TODO: Implement fetchDataWithLoading function
  // Fetch from: https://jsonplaceholder.typicode.com/posts/1
  // Requirements:
  // 1. Set loading state to true at start
  // 2. Clear error state
  // 3. Make the API call
  // 4. Handle success and error
  // 5. Always set loading to false in finally block
  const fetchDataWithLoading = async () => {
    // Your code here
  };

  // TODO: Implement fetchDataWithButtonLoading function
  // Fetch from: https://jsonplaceholder.typicode.com/users/1
  // Use a separate loading state for the button (buttonLoading)
  // Disable the button while loading
  // Show ActivityIndicator in the button while loading
  const fetchDataWithButtonLoading = async () => {
    // Your code here
  };

  // TODO: Implement fetchMultipleData function
  // Fetch multiple resources sequentially:
  // 1. First: https://jsonplaceholder.typicode.com/posts/1
  // 2. Then: https://jsonplaceholder.typicode.com/users/1
  // Show loading state for the entire operation
  // Combine both results in the data state
  const fetchMultipleData = async () => {
    // Your code here
  };

  // TODO: Implement fetchWithSkeleton function
  // Fetch from: https://jsonplaceholder.typicode.com/posts/1
  // While loading, show a skeleton/placeholder UI instead of just ActivityIndicator
  // Create placeholder boxes that mimic the data structure
  const fetchWithSkeleton = async () => {
    // Your code here
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Exercise 4: Loading States</Text>
        <Text style={styles.description}>
          Complete the TODO items to implement proper loading states.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <Text style={styles.taskItem}>1. Implement basic loading state</Text>
          <Text style={styles.taskItem}>2. Implement button-specific loading state</Text>
          <Text style={styles.taskItem}>3. Implement loading for multiple requests</Text>
          <Text style={styles.taskItem}>4. Implement skeleton/placeholder loading UI</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={fetchDataWithLoading}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>1. Basic Loading State</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, buttonLoading && styles.buttonDisabled]}
            onPress={fetchDataWithButtonLoading}
            disabled={buttonLoading}
          >
            {buttonLoading ? (
              <View style={styles.buttonLoading}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonText}>Loading...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>2. Button Loading State</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={fetchMultipleData}
            disabled={loading}
          >
            <Text style={styles.buttonText}>3. Multiple Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={fetchWithSkeleton}
            disabled={loading}
          >
            <Text style={styles.buttonText}>4. Skeleton Loading</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading data...</Text>
            </View>
          )}
          {loading && (
            <View style={styles.skeletonContainer}>
              <View style={styles.skeletonLine} />
              <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
              <View style={styles.skeletonLine} />
            </View>
          )}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          )}
          {data && !loading && (
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>
                {JSON.stringify(data, null, 2)}
              </Text>
            </View>
          )}
          {!data && !loading && !error && (
            <Text style={styles.placeholder}>
              Click a button above to see loading states
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
  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  skeletonContainer: {
    marginTop: 15,
  },
  skeletonLine: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonLineShort: {
    width: '60%',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  errorText: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
  },
  dataContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dataText: {
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

export default Exercise4;

