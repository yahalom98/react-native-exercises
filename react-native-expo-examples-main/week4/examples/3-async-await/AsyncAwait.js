import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

function AsyncAwait() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Example 1: Basic async/await
  const basicAsyncAwait = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      setResult({ type: 'Basic async/await', data });
      setLoading(false);
    } catch (error) {
      setResult({ type: 'Error', error: error.message });
      setLoading(false);
    }
  };

  // Example 2: Async/await with Axios
  const asyncAwaitAxios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setResult({ type: 'Async/await with Axios', data: response.data });
      setLoading(false);
    } catch (error) {
      setResult({ type: 'Error', error: error.message });
      setLoading(false);
    }
  };

  // Example 3: Multiple sequential requests
  const sequentialRequests = async () => {
    setLoading(true);
    try {
      // First request
      const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      const post = postResponse.data;

      // Second request (depends on first)
      const userResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${post.userId}`
      );
      const user = userResponse.data;

      setResult({
        type: 'Sequential Requests',
        post: post.title,
        author: user.name,
      });
      setLoading(false);
    } catch (error) {
      setResult({ type: 'Error', error: error.message });
      setLoading(false);
    }
  };

  // Example 4: Parallel requests with Promise.all
  const parallelRequests = async () => {
    setLoading(true);
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3'),
        axios.get('https://jsonplaceholder.typicode.com/users?_limit=3'),
      ]);

      setResult({
        type: 'Parallel Requests',
        postsCount: postsResponse.data.length,
        usersCount: usersResponse.data.length,
      });
      setLoading(false);
    } catch (error) {
      setResult({ type: 'Error', error: error.message });
      setLoading(false);
    }
  };

  // Example 5: Async function with delay
  const asyncWithDelay = async () => {
    setLoading(true);
    try {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setResult({
        type: 'Async with Delay',
        data: response.data,
        message: 'Waited 2 seconds before fetching',
      });
      setLoading(false);
    } catch (error) {
      setResult({ type: 'Error', error: error.message });
      setLoading(false);
    }
  };

  // Example 6: Error handling with try/catch
  const errorHandlingExample = async () => {
    setLoading(true);
    try {
      // This will fail (404)
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/99999');
      setResult({ type: 'Success', data: response.data });
      setLoading(false);
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        setResult({
          type: 'Error Handling',
          status: error.response.status,
          message: error.response.statusText,
        });
      } else if (error.request) {
        // Request made but no response
        setResult({
          type: 'Error Handling',
          message: 'No response from server',
        });
      } else {
        // Something else happened
        setResult({
          type: 'Error Handling',
          message: error.message,
        });
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Async/Await Pattern</Text>
        <Text style={styles.description}>
          Async/await makes asynchronous code look and behave like synchronous code.
          It's built on Promises and makes error handling easier with try/catch.
        </Text>

        {/* Key Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Points</Text>
          <Text style={styles.listItem}>• async functions always return a Promise</Text>
          <Text style={styles.listItem}>• await pauses execution until Promise resolves</Text>
          <Text style={styles.listItem}>• Use try/catch for error handling</Text>
          <Text style={styles.listItem}>• Sequential: await one after another</Text>
          <Text style={styles.listItem}>• Parallel: use Promise.all()</Text>
        </View>

        {/* Example Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Examples</Text>
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={basicAsyncAwait}
            disabled={loading}
          >
            <Text style={styles.buttonText}>1. Basic async/await</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={asyncAwaitAxios}
            disabled={loading}
          >
            <Text style={styles.buttonText}>2. Async/await with Axios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={sequentialRequests}
            disabled={loading}
          >
            <Text style={styles.buttonText}>3. Sequential Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={parallelRequests}
            disabled={loading}
          >
            <Text style={styles.buttonText}>4. Parallel Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={asyncWithDelay}
            disabled={loading}
          >
            <Text style={styles.buttonText}>5. Async with Delay</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={errorHandlingExample}
            disabled={loading}
          >
            <Text style={styles.buttonText}>6. Error Handling</Text>
          </TouchableOpacity>
        </View>

        {/* Result Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>
          {loading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
          {result && !loading && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultType}>{result.type}</Text>
              <Text style={styles.resultText}>
                {JSON.stringify(result, null, 2)}
              </Text>
            </View>
          )}
          {!result && !loading && (
            <Text style={styles.placeholder}>
              Click a button above to see async/await in action
            </Text>
          )}
        </View>

        {/* Code Comparison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promise vs Async/Await</Text>
          
          <Text style={styles.codeTitle}>Using Promises (.then):</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });`}
            </Text>
          </View>

          <Text style={styles.codeTitle}>Using Async/Await:</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`try {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}`}
            </Text>
          </View>
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
    lineHeight: 20,
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
  listItem: {
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
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  placeholder: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  codeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 6,
    marginBottom: 15,
  },
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#f8f8f2',
    lineHeight: 18,
  },
});

export default AsyncAwait;

