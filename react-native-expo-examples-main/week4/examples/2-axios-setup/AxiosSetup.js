import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

function AxiosSetup() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Example 1: Basic GET request with Axios
  const axiosGet = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setData(response.data);
      setError(null);
      console.log('Response:', response);
    } catch (err) {
      setError(err.message);
      setData(null);
      console.error('Axios error:', err);
    }
  };

  // Example 2: GET with query parameters
  const axiosGetWithParams = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          userId: 1,
          _limit: 5,
        },
      });
      setData({ posts: response.data, count: response.data.length });
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  // Example 3: POST request
  const axiosPost = async () => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: 'My New Post',
          body: 'This is the content of my post',
          userId: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setData(response.data);
      setError(null);
      Alert.alert('Success', 'Post created successfully!');
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  // Example 4: PUT request
  const axiosPut = async () => {
    try {
      const response = await axios.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          id: 1,
          title: 'Updated Post Title',
          body: 'Updated content',
          userId: 1,
        }
      );
      setData(response.data);
      setError(null);
      Alert.alert('Success', 'Post updated successfully!');
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  // Example 5: DELETE request
  const axiosDelete = async () => {
    try {
      await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
      setData({ message: 'Post deleted successfully' });
      setError(null);
      Alert.alert('Success', 'Post deleted successfully!');
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  // Example 6: Axios instance with base URL
  const axiosInstanceExample = async () => {
    // Create an axios instance with default config
    const api = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      const response = await api.get('/posts/1');
      setData({ 
        ...response.data, 
        note: 'This was fetched using an axios instance' 
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Axios Setup & Usage</Text>
        <Text style={styles.description}>
          Axios is a popular HTTP client library that makes API calls easier.
          It automatically converts JSON, has better error handling, and supports interceptors.
        </Text>

        {/* Installation Note */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>📦 Installation</Text>
          <Text style={styles.noteText}>
            npm install axios{'\n'}
            or{'\n'}
            yarn add axios
          </Text>
        </View>

        {/* Example Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Axios Methods</Text>
          
          <TouchableOpacity style={styles.button} onPress={axiosGet}>
            <Text style={styles.buttonText}>1. GET Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={axiosGetWithParams}>
            <Text style={styles.buttonText}>2. GET with Params</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={axiosPost}>
            <Text style={styles.buttonText}>3. POST Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={axiosPut}>
            <Text style={styles.buttonText}>4. PUT Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={axiosDelete}>
            <Text style={styles.buttonText}>5. DELETE Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={axiosInstanceExample}>
            <Text style={styles.buttonText}>6. Axios Instance</Text>
          </TouchableOpacity>
        </View>

        {/* Response Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Response</Text>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          )}
          {data && (
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>
                {JSON.stringify(data, null, 2)}
              </Text>
            </View>
          )}
          {!data && !error && (
            <Text style={styles.placeholder}>
              Click a button above to make a request
            </Text>
          )}
        </View>

        {/* Code Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Syntax</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`import axios from 'axios';

// GET request
const response = await axios.get('https://api.example.com/data');

// POST request
const response = await axios.post('https://api.example.com/data', {
  name: 'John',
  age: 30
});

// With error handling
try {
  const response = await axios.get('https://api.example.com/data');
  console.log(response.data);
} catch (error) {
  console.error('Error:', error.message);
}`}
            </Text>
          </View>
        </View>

        {/* Advantages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Axios Advantages</Text>
          <Text style={styles.listItem}>✓ Automatic JSON data transformation</Text>
          <Text style={styles.listItem}>✓ Better error handling</Text>
          <Text style={styles.listItem}>✓ Request/response interceptors</Text>
          <Text style={styles.listItem}>✓ Request timeout support</Text>
          <Text style={styles.listItem}>✓ Automatic request body serialization</Text>
          <Text style={styles.listItem}>✓ Works in both browser and Node.js</Text>
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
  noteContainer: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1976D2',
  },
  noteText: {
    fontSize: 14,
    color: '#1565C0',
    fontFamily: 'monospace',
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
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
  placeholder: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#f8f8f2',
    lineHeight: 18,
  },
  listItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default AxiosSetup;

