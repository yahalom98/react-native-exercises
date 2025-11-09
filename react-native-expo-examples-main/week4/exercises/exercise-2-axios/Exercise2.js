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

function Exercise2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Implement fetchUserWithAxios function
  // Use axios.get() to fetch user from: https://jsonplaceholder.typicode.com/users/1
  // Steps:
  // 1. Set loading to true
  // 2. Clear error state
  // 3. Use axios.get() with try/catch
  // 4. Access data from response.data
  // 5. Handle errors appropriately
  // 6. Set loading to false in finally
  const fetchUserWithAxios = async () => {
    // Your code here
  };

  // TODO: Implement fetchUsersWithParams function
  // Fetch users with query parameters: _limit=3
  // URL: https://jsonplaceholder.typicode.com/users
  // Use params option in axios.get()
  const fetchUsersWithParams = async () => {
    // Your code here
  };

  // TODO: Implement updateUser function
  // Update user with PUT request
  // URL: https://jsonplaceholder.typicode.com/users/1
  // Body: { id: 1, name: 'Updated Name', email: 'updated@example.com' }
  // Use axios.put()
  const updateUser = async () => {
    // Your code here
  };

  // TODO: Implement deleteUser function
  // Delete user with DELETE request
  // URL: https://jsonplaceholder.typicode.com/users/1
  // Use axios.delete()
  // Show success message when done
  const deleteUser = async () => {
    // Your code here
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Exercise 2: Axios</Text>
        <Text style={styles.description}>
          Complete the TODO items to implement axios API calls.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <Text style={styles.taskItem}>1. Implement fetchUserWithAxios() - GET request</Text>
          <Text style={styles.taskItem}>2. Implement fetchUsersWithParams() - GET with params</Text>
          <Text style={styles.taskItem}>3. Implement updateUser() - PUT request</Text>
          <Text style={styles.taskItem}>4. Implement deleteUser() - DELETE request</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={fetchUserWithAxios}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Fetch User (Axios)</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={fetchUsersWithParams}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Fetch Users with Params</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={updateUser}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Update User</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={deleteUser}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Delete User</Text>
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
              Click a button above to fetch data
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

export default Exercise2;

